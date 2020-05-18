// import React from "react";
// import { Form, Message } from "semantic-ui-react";
// import { User, UserWithAccount } from "../../protcol/user";
// import { useTextInput } from "../hooks/form";
// import { useFetch } from "../hooks/network";

// const Component: React.FC<{
//   error?: { message: string };
//   loading?: boolean;
//   user: User;
//   handleSubmit: () => void;
// }> = ({ loading, error, user, handleSubmit }) => {
//   return (
//     <Form error={!!error} loading={loading} onSubmit={handleSubmit}>
//       <Message error={true} content={error ? error.message : "予期せぬエラーが発生しました"} />
//       <Form.Field required={true}>
//         <label>タグ名</label>
//         <Form.Input type="text" required={true} {...tagNameProps} />
//         <Form.Button>変更</Form.Button>
//       </Form.Field>
//     </Form>
//   );
// };

// const Container: React.FC<{ user: Partial<UserWithAccount> }> = ({ user }) => {
//   const { name, keyword, hint, twitterId, generation, content } = user;
//   const hooks = {
//     name: useTextInput(name),
//     keyword: useTextInput(keyword),
//     hint: useTextInput(hint),
//     twitterId: useTextInput(twitterId),
//     content: useTextInput(content),
//     generation: useTextInput(generation ? String(generation) : undefined),
//   };
//   type Entries<T> = {
//       [P in keyof T]: [P, T[P]];
//   }[keyof T];
//   type hoge = Entries<typeof hooks>
//   (Object.entries(hooks) as hoge)
//   const [submit, { loading, error, success }] = useFetch<string>("/api/private/signup", {
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//     body:
//   });
// };
