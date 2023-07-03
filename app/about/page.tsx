import { getAuthorInfo } from '@/app/about/api';
import InfoDisplay from '@/app/about/info';

export default async function About() {
  const info = await getAuthorInfo();

  return <InfoDisplay info={info} />;
}
