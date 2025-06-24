import React, { useCallback, useMemo } from 'react';
import type { GetStaticProps, NextPage } from 'next/js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ImageProps } from '@/types/image';
import { useLastViewedPhoto } from '@/hooks/useLastViewedPhoto';
import { ImageGrid } from '@/components/gallery/ImageGrid';
import { Modal } from '@/components/modal/Modal';
import { getImagesWithBlurData } from '@/utils/imageService';

interface HomeProps {
  images: ImageProps[];
}

const Home: NextPage<HomeProps> = ({ images }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const handleModalClose = useCallback(() => {
    if (photoId) {
      setLastViewedPhoto(String(photoId));
    }
  }, [photoId, setLastViewedPhoto]);

  const memoizedImageGrid = useMemo(
    () => (
      <ImageGrid
        images={images}
        lastViewedPhoto={lastViewedPhoto}
        onSetLastViewedPhoto={setLastViewedPhoto}
      />
    ),
    [images, lastViewedPhoto, setLastViewedPhoto]
  );

  return (
    <>
      <Head>
        <title>galeri.losa.dev</title>
        <meta name="description" content="A modern photo gallery built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && <Modal images={images} onClose={handleModalClose} />}
        {memoizedImageGrid}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const images = await getImagesWithBlurData();
    
    return {
      props: {
        images,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Failed to fetch images:', error);
    
    return {
      props: {
        images: [],
      },
      revalidate: 60, // Retry more frequently on error
    };
  }
};

export default Home;