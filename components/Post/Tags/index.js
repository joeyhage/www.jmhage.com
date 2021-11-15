import TagsStyles from "@styles/Tags.module.css";

export default function Tags({ tags }) {
  return (
    <ul className={TagsStyles.tags}>
      {tags.map((tag) => (
        <li className={TagsStyles.tags__tag} key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
