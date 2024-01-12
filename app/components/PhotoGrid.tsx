
import { createServerClient } from "@supabase/ssr";
import Photo from "./Photo";
import { cookies } from "next/headers";

interface PhotoObject {
    url: any;
    photoName: any;
    isFavorited: any;
}

interface Props {
    favorites?: any;
}

async function fetchUserPhotos(user: any, supabaseServer: any) {
    if (!user) return;

    const folderPath = `user_uploads/${user.id}/`;
    const { data, error } = await supabaseServer.storage
        .from("photos")
        .list(folderPath);

    if (error) {
        console.error("Error fetching photos", error);
        return;
    }
    return data;
}

async function getPhotoUrls(
    photos: any[],
    user: any,
    supabaseServer: any
): Promise<PhotoObject[]> {
    const results = await Promise.all(
        photos.map(async (photo) => {
            const { data, error } = await supabaseServer.storage
                .from("photos")
                .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60);
            if (error) {
                console.error("Error generating signed url", error);
                return null;
            }
            return { url: data.signedUrl, photoName: photo.name, isFavorited: false };
        })
    );

    // Filter out null values and only keep valid PhotoObject instances
    return results.filter((result): result is PhotoObject => result !== null);
}

async function fetchFavoritePhotos(user: any, supabaseServer: any) {
    const { data, error } = await supabaseServer
        .from("favorites")
        .select("photo_name")
        .eq("user_id", user.id);

    if (error) {
        console.error(`Error fetching favorites`, error);
        return [];
    }
    return data.map((favorite: any) => favorite.photo_name);
}

export default async function PhotoGrid({ favorites = false }: Props) {
    const cookieStore = cookies();


    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Supabase URL or Supabase Anon Key is not defined");
    }

    const supabaseServer = createServerClient(
        supabaseUrl as string,  
        supabaseAnonKey as string,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    const { data: { user } } = await supabaseServer.auth.getUser();
    const photos = await fetchUserPhotos(user, supabaseServer);
    const photoObjects = await getPhotoUrls(photos, user, supabaseServer);
    const favoritePhotoNames = await fetchFavoritePhotos(user, supabaseServer);

    const photosWithFavorites: PhotoObject[] = photoObjects.map((photo) => ({
        ...photo,
        isFavorited: favoritePhotoNames.includes(photo.photoName),
    }));

    const displayedPhotos = favorites
        ? photosWithFavorites.filter((photo) => photo.isFavorited)
        : photosWithFavorites;

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {displayedPhotos.map((photo) => (
                <Photo
                    key={photo.photoName}
                    src={photo.url}
                    alt={`Photo ${photo.photoName}`}
                    width={200}
                    height={200}
                    photoName={photo.photoName}
                    isFavorited={photo.isFavorited}
                />
            ))}
        </div>
    );
}
