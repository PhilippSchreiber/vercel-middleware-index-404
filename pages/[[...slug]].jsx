import { useRouter } from "next/router";

const dataProvider = {
  de: {
    "/": {
      title: "Startseite",
      slug: ["index"],
    },
    "ueber-uns": {
      title: "Über uns",
      slug: ["ueber-uns"],
    },
    "ueber-uns/team": {
      title: "Über uns > Team",
      slug: ["ueber-uns", "team"],
    },
  },
  at: {
    "/": {
      title: "Startseite",
      slug: ["index"],
    },
    "ueber-uns": {
      title: "Über uns",
      slug: ["ueber-uns"],
    },
    "ueber-uns/team": {
      title: "Über uns > Team",
      slug: ["ueber-uns", "team"],
    },
  },
  en: {
    "/": {
      title: "Home Page",
      slug: ["index"],
    },
    "about-us": {
      title: "About us",
      slug: ["about-us"],
    },
    "about-us/team": {
      title: "About us > Team",
      slug: ["about-us", "team"],
    },
  },
};

const getPagePath = (slug) => {
  let slugString = "/";
  if (slug) {
    slugString = slug.join("/");
  }
  return slugString;
};

const SlugPage = (props) => {
  console.log({ props });
  let { data } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return <div>{data.title}</div>;
};

export const getStaticPaths = () => {
  let paths = [];
  Object.keys(dataProvider).map((locale) => {
    Object.keys(dataProvider[locale]).map((page) => {
      paths.push({
        locale,
        params: { slug: page.slug },
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ locale, params }) => {
  return await new Promise((resolve) => {
    const pagePath = getPagePath(params.slug);
    if (dataProvider[locale][pagePath]) {
      resolve({
        props: {
          data: { title: dataProvider[locale][pagePath].title },
          key: pagePath,
        },
        revalidate: 30,
      });
      return;
    }

    resolve({
      notFound: true,
      revalidate: 30,
    });
  });
};

export default SlugPage;
