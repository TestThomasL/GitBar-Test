import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  hooks: { afterAllFileWrite: ["prettier --write"] },
  overwrite: true,
  generates: {
    "./src/core/gql/github/codegen/": {
      preset: "client",
      schema: {
        "https://api.github.com/graphql": {
          method: "GET",
          headers: {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
            "user-agent": "My-User-Agent",
          },
        },
      },
      documents: [
        "./src/core/gql/github/queries/**/*.ts",
        "./src/core/gql/github/fragments/**/*.ts",
      ],
      plugins: [],
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
    // "./src/core/gql/gitlab/codegen/": {
    //   preset: "client",
    //   schema: {
    //     "https://gitlab.com/api/graphql": {
    //       method: "GET",
    //       headers: {
    //         Authorization: `bearer ${process.env.GITLAB_TOKEN}`,
    //         "user-agent": "My-User-Agent",
    //       },
    //     },
    //   },
    //   documents: [
    //     "./src/core/gql/gitlab/queries/**/*.ts",
    //     "./src/core/gql/gitlab/fragments/**/*.ts",
    //   ],
    // plugins: [
    //     {
    //       add: {
    //         // Add a comment to the top of each generated file
    //         content: "// @ts-nocheck\n",
    //       },
    //     },
    //   ],
    //   presetConfig: {
    //     fragmentMasking: { unmaskFunctionName: "getFragmentData" },
    //   },
    // },
  },
};

export default config;
