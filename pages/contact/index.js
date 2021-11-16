import ContentWrapper from "@components/ContentWrapper";
import HeroBanner from "@components/HeroBanner";
import PageContentWrapper from "@components/PageContentWrapper";
import PageMeta from "@components/PageMeta";
import RichTextPageContent from "@components/RichTextPageContent";
import { useForm, ValidationError } from "@formspree/react";
import MainLayout from "@layouts/main";
import ButtonStyles from "@styles/Button.module.css";
import FormStyles from "@styles/Form.module.css";
import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";

export default function Contact(props) {
  const { assets, pageContent, preview } = props;

  const [formState, handleSubmit] = useForm("xrgrnkqp");

  const pageTitle = pageContent ? pageContent.title : "Contact Me";

  const pageDescription = pageContent
    ? pageContent.description
    : "Personal website for Joey Hage";

  return (
    <>
      <MainLayout assets={assets} preview={preview}>
        <PageMeta
          title={pageTitle}
          description={pageDescription}
          url={Config.pageMeta.home.url}
        >
          <script
            src="https://www.google.com/recaptcha/api.js"
            async
            defer
          ></script>
        </PageMeta>

        {pageContent && pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        <ContentWrapper>
          {pageContent && pageContent.body && (
            <PageContentWrapper>
              <RichTextPageContent richTextBodyField={pageContent.body} />
            </PageContentWrapper>
          )}
          {formState.succeeded ? (
            <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
              Thanks for reaching out! I will get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <fieldset className={FormStyles.fieldset}>
                <label htmlFor="full-name" className={FormStyles.label}>
                  Full Name
                </label>
                <input
                  className={FormStyles.field}
                  type="text"
                  name="name"
                  id="full-name"
                  placeholder="First and Last"
                  required
                />
                <ValidationError
                  prefix="Full Name"
                  field="name"
                  errors={formState.errors}
                />
                <label htmlFor="email-address" className={FormStyles.label}>
                  Email Address
                </label>
                <input
                  className={FormStyles.field}
                  type="email"
                  name="email"
                  id="email-address"
                  placeholder="email@domain.tld"
                  required
                />
                <ValidationError
                  prefix="Email Address"
                  field="email"
                  errors={formState.errors}
                />
                <label htmlFor="message" className={FormStyles.label}>
                  Message
                </label>
                <textarea
                  className={FormStyles.field}
                  type="text"
                  rows="5"
                  name="message"
                  id="message"
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={formState.errors}
                />
                <input
                  type="hidden"
                  name="_subject"
                  id="email-subject"
                  value="www.jmhage.com Contact Form Submission"
                />
              </fieldset>
              <div
                className="g-recaptcha"
                data-sitekey="6Lco4jQdAAAAANFJt-uWbSKQfCnHn5vmY0RWnF0q"
                style={{ marginBottom: "1rem" }}
              />
              <button
                className={ButtonStyles.button}
                type="submit"
                disabled={formState.submitting}
              >
                Submit
              </button>
            </form>
          )}
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.contact.slug,
    {
      preview: preview,
    },
  );

  const assets = await ContentfulApi.getSiteAssets();

  return {
    props: {
      assets,
      preview,
      pageContent: pageContent || null,
    },
  };
}
