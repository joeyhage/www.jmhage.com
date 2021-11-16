import Pagination from "@components/PostList/Pagination";
import { Config } from "@utils/Config";
import Image from "next/image";
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
          <div className="column is-6" key={project.sys.id}>
            <article className="card">
              <div className="card-image" style={borderBottomStyle}>
                <figure className="image is-square">
                  <Image
                    src={project.preview.url}
                    alt={project.preview.title}
                    layout="fill"
                  />
                </figure>
              </div>
              <header style={{ borderBottom: "1px solid rgb(10 10 10 / 10%)" }}>
                <p className="card-header-title">{project.title}</p>
              </header>
              <div className="card-content">
                <div className="content">{project.excerpt}</div>
              </div>
              <footer className="card-footer">
                <Link
                  href={`${Config.pageMeta.projectIndex.slug}/${project.slug}`}
                >
                  <a className="card-footer-item">Read more</a>
                </Link>
              </footer>
            </article>
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
}
