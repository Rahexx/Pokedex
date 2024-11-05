import { addDoc, collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '../../../firebaseConfig';
import { revalidateTag } from 'next/cache';

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
