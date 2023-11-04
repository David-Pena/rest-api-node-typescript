import { type DocumentData, type DocumentReference, type QueryConstraint, type WhereFilterOp, getFirestore, limit, where, doc, setDoc, collection, getDocs, query, getDoc, type DocumentSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from './firebase';
import { type Models } from '../types/Models';
import { type BaseRecord } from '../types';
import { v4 as uuidv4 } from 'uuid';

const firestore = getFirestore(app);

interface Operations<Model> {
  collection: keyof Models | string | null;
  ref: (collection: keyof Models, id: string) => DocumentReference<DocumentData>;
  find: (...contraints: QueryConstraint[]) => Promise<Array<BaseRecord<Model>>>;
  findById: (id: string) => Promise<BaseRecord<Model> | null>;
  create: (data: Model, uid?: string) => Promise<{ data: BaseRecord<Model>; ref: DocumentReference<DocumentData> }>;
  update: (id: string, data: Partial<Model>) => Promise<void>;
  destroy: (id: string) => Promise<void>;
  where: (fieldPath: keyof Model | string, opStr: WhereFilterOp, value: unknown) => QueryConstraint;
  limit: typeof limit;
}

const useDatabaseMethods = {
  collection: '',

  ref: function (collection: string, id: string) {
    const path = `${collection}/${id}`;
    return doc(firestore, path);
  },

  create: async function <T>(_data: T, uid: string = '') {
    const id = uid ?? uuidv4();

    const now = new Date();
    const createdAt = now.toISOString();
    const updatedAt = now.toISOString();

    let data = Object.assign({ createdAt, updatedAt }, _data) as BaseRecord<T>;

    const ref = this.ref(this.collection, id);
    await setDoc(ref, data as any);

    data = { ...data, id };

    return { data, ref };
  },

  find: async function <T>(...constraints: QueryConstraint[]) {
    const ref = collection(firestore, this.collection);
    const q = query(ref, ...constraints);
    const snapshots = await getDocs(q);

    const records: T[] = [];

    snapshots.forEach((doc) => records.push({ ...doc.data(), id: doc.id } as T));

    return records;
  },

  findById: async function <T>(id: string) {
    const ref = this.ref(this.collection, id);
    const snapshot = (await getDoc(ref)) as DocumentSnapshot<T>;

    return snapshot.exists()
      ? ({ ...snapshot.data(), id: snapshot.id } as T)
      : null;
  },

  update: async function <T>(id: string, _updates: Partial<T>) {
    const updatedAt = new Date().toISOString();
    const ref = this.ref(this.collection, id);
    const updates = { ..._updates, updatedAt };

    await updateDoc(ref, updates);
  },

  destroy: async function (id: string) {
    await deleteDoc(this.ref(this.collection, id));
  },

  where,

  limit
};

const useCollection = <T extends keyof Models>(collection: T) => {
  const database = Object.create(useDatabaseMethods) as typeof useDatabaseMethods;
  database.collection = collection;
  return database as Operations<Models[T]>;
};

export const useDatabase = () => {
  return {
    useCollection
  };
};
