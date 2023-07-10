import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { getAuthorInfo } from '@/app/(contentful)/api';
import InfoDisplay from '@/app/about/info';

export default async function About() {
  const { isEnabled } = draftMode();
  const info = await getAuthorInfo(isEnabled);

  return <InfoDisplay info={info} />;
}

export const metadata: Metadata = {
  title: 'About Me',
};
