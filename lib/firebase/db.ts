import { DocumentItem, SubjectItem } from '@/lib/types';
import { documentsData } from '@/data/documents';
import { subjectsData } from '@/data/subjects';

/**
 * Abstracted Repository Layer
 * Currently consumes local seed/in-memory data with identical shape to Firestore.
 * Ready for transparent Firebase Firestore swap without modifying consumer pages.
 */

export async function getSubjects(): Promise<SubjectItem[]> {
  return [...subjectsData];
}

export async function getSubjectById(id: string): Promise<SubjectItem | undefined> {
  return subjectsData.find((subject) => subject.id === id);
}

export async function getDocuments(): Promise<DocumentItem[]> {
  return [...documentsData];
}

export async function getDocumentsBySubject(
  subjectId: DocumentItem['subjectId']
): Promise<DocumentItem[]> {
  return documentsData.filter((doc) => doc.subjectId === subjectId);
}

export async function getDocumentsByCategory(
  category: DocumentItem['category'],
  subjectId?: DocumentItem['subjectId']
): Promise<DocumentItem[]> {
  return documentsData.filter((doc) => {
    const matchesCat = doc.category === category;
    const matchesSub = subjectId ? doc.subjectId === subjectId : true;
    return matchesCat && matchesSub;
  });
}

export async function getDocumentById(id: string): Promise<DocumentItem | undefined> {
  return documentsData.find((doc) => doc.id === id);
}
