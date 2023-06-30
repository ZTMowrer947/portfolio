import Chance from 'chance';

import InfoDisplay, { PersonalInfo } from '@/app/about/info';

export default function About() {
  const chance = new Chance();

  const info: PersonalInfo = {
    name: chance.name(),
    bio: chance.paragraph(),
    profileImageUrl: 'https://placehold.co/500x500',
    externalLinks: [],
  };

  return <InfoDisplay info={info} />;
}
