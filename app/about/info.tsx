import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { ImageData } from '@/app/projects/type';

interface InfoLink {
  label: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  bio: string;
  profileImageUrl: ImageData;
  externalLinks: InfoLink[];
}

interface InfoDisplayProps {
  info: PersonalInfo;
}

export default function InfoDisplay({ info }: InfoDisplayProps) {
  return (
    <main className="grid grid-cols-3 p-24">
      <header className="col-span-3 mb-2 border-b">
        <h1 className="text-3xl text-center uppercase">About Me</h1>
      </header>

      <aside className="text-center">
        <Image
          className="rounded-md"
          src={info.profileImageUrl.src}
          alt={info.profileImageUrl.altText}
          width={info.profileImageUrl.width}
          height={info.profileImageUrl.height}
        />
        <h3 className="uppercase">{info.name}</h3>
      </aside>

      <article className="col-span-2 ms-4">
        <ReactMarkdown>{info.bio}</ReactMarkdown>

        <section className="border-2 text-center mt-2">
          <h3 className="uppercase border-b-2">Links</h3>
          <ul className="grid grid-cols-2">
            {info.externalLinks.map((link) => (
              <li className="border-2 rounded m-1" key={link.label}>
                <a
                  href={link.url}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
