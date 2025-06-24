import React from 'react';
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next/js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ImageProps } from '@/types/image';
import { Carousel } from '@/components/modal/Carousel';
import { getImagesWithBlurData, getSingleImageWithBlur } from '@/utils/imageService';
import { buildCloudinaryUrl, IMAGE_SIZES } from '@/utils/imageUtils';

interface PhotoPageProps {
  currentPhoto: ImageProps;
}

const PhotoPage: NextPage<PhotoPageProps> = ({ currentPhoto }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const index = Number(photoId);

  const currentPhotoUrl = buildCloudinaryUrl(
    currentPhoto.public_id,
    currentPhoto.format,
    IMAGE_SIZES.XLARGE
  );

  return (
    <>
      <Head>
        <title>{`Photo ${index + 1} - galeri.losa.dev`}</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<PhotoPageProps> = async (context) => {
  try {
    const photoId = Number(context.params?.photoId);
    const currentPhoto = await getSingleImageWithBlur(photoId);

    if (!currentPhoto) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        currentPhoto,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch photo:', error);
    
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const images = await getImagesWithBlurData();
    
    const paths = images.map((_, index) => ({
      params: { photoId: index.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Failed to generate static paths:', error);
    
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export default PhotoPage;