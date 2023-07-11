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
    <main className="grid grid-cols-3 xl:grid-cols-4 p-12">
      <header className="col-span-3 xl:col-span-4 mb-2 border-b border-slate-600 dark:border-white">
        <h1 className="text-3xl text-center uppercase">About Me</h1>
      </header>

      <aside className="text-center relative col-start-2 col-end-3 lg:col-start-auto lg:col-end-auto">
        <Image
          className="rounded-md"
          src={info.profileImageUrl.src}
          alt={info.profileImageUrl.altText}
          width={info.profileImageUrl.width}
          height={info.profileImageUrl.height}
        />
        <h3 className="uppercase">{info.name}</h3>
      </aside>

      <article className="col-span-3 lg:max-xl:col-span-2 ms-4">
        <ReactMarkdown>{info.bio}</ReactMarkdown>

        <section className="border-2 text-center mt-2 border-slate-600 dark:border-white">
          <h3 className="uppercase border-b-2 border-slate-600 dark:border-white">
            Links
          </h3>
          <ul className="grid grid-cols-2">
            {info.externalLinks.map((link) => (
              <a
                href={link.url}
                rel="noreferrer noopener"
                target="_blank"
                className="uppercase"
                key={link.label}
              >
                <li className="border-2 rounded m-1 border-slate-600 dark:border-white hover:border-black hover:text-black dark:hover:border-gray-400 dark:hover:text-gray-400">
                  {link.label}
                </li>
              </a>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
