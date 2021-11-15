import AuthorStyles from "@styles/Author.module.css";
import Image from "next/image";

export default function Author({ author }) {
  return (
    <>
      <div className={AuthorStyles.author}>
        <div className={AuthorStyles.author__imgContainer}>
          <Image
            className={AuthorStyles.author__img}
            src={`${author.image.url}?w=350`}
            alt={author.image.description}
            height={author.image.height}
            width={author.image.width}
          />
        </div>
        <div className={AuthorStyles.author__detailsContainer}>
          <h2 className={AuthorStyles.author__name}>{author.name}</h2>
          <p className={AuthorStyles.author__description}>
            {author.description}
          </p>
        </div>
      </div>
    </>
  );
}
