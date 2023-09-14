import ContentfulImage from "@components/ContentfulImage";
import Pagination from "@components/ProjectList/Pagination";
import { Config } from "@utils/Config";
import Link from "next/link";

export default function ProjectList(props) {
  const { projects, currentPage, totalPages } = props;
  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  const borderBottomStyle = { borderBottom: "1px solid rgb(10 10 10 / 10%)" };
  return (
    <>
      <div className="columns is-multiline">
        {projects.map((project) => (
          <div className="column is-6 my-3" key={project.sys.id}>
            <Card project={project} />
          </div>
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </>
  );

  function Card({ project }) {
    return (
      <article className="card">
        <div className="card-image" style={borderBottomStyle}>
          <figure className="image is-square">
            <Link href={`${Config.pageMeta.projectIndex.slug}/${project.slug}`}>
              <a>
                <ContentfulImage
                  src={new String(project.preview.url)}
                  alt={project.preview.title}
                  layout="fill"
                  quality={50}
                />
              </a>
            </Link>
          </figure>
        </div>
        <header style={borderBottomStyle}>
          <p className="card-header-title">{project.title}</p>
        </header>
        <div className="card-content">
          <div className="content">{project.excerpt}</div>
        </div>
        <footer className="card-footer">
          <Link
            href={`${Config.pageMeta.projectIndex.slug}/${project.slug}`}
            className="card-footer-item"
          >
            Read more
          </Link>
        </footer>
      </article>
    );
  }
}
