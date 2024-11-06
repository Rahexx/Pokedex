import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '../../../firebaseConfig';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'favoritePokemons'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { data },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Revalidate-Tag': 'favoritePokemons',
        },
      },
    );
  } catch (err) {
    console.log('Err', err);
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: errorMessage ?? 'Internal error' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    addDoc(collection(db, 'favoritePokemons'), { name: body.name });

    return NextResponse.json({ info: true });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: errorMessage ?? 'Internal error' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Pokemon name is required' },
        { status: 400 },
      );
    }
    const favoritePokemonRef = collection(db, 'favoritePokemons');
    const q = query(favoritePokemonRef, where('name', '==', name));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Pokemon not found in favorites' },
        { status: 404 },
      );
    }

    for (const doc of snapshot.docs) {
      await deleteDoc(doc.ref);
    }

    return NextResponse.json(
      { message: `${name} removed from favorites` },
      { status: 200 },
    );
  } catch (err) {
    console.error('erro deleting pokemon from favorite', err);
    return NextResponse.json(
      { erro: 'erro deleting pokemon from favorite' },
      { status: 500 },
    );
  }
}
