import React, { useCallback, ChangeEvent } from "react";
import { Form, Message } from "semantic-ui-react";
import { User, UserWithAccount } from "../../protcol/user";
import { useTextInput } from "../hooks/form";
import { useFetch } from "../hooks/network";

type ConfigurableProp = Pick<UserWithAccount, "name" | "keyword" | "hint" | "twitterId" | "content" | "generation">;
type InputHooks = {
  [P in keyof ConfigurableProp]: { value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
};

const Component: React.FC<{
  error?: { message: string } | null;
  loading?: boolean;
  success?: boolean;
  hooks: InputHooks;
  handleSubmit: () => void;
}> = ({ loading, error, hooks, handleSubmit, success }) => {
  const { name, keyword, hint, twitterId, content, generation } = hooks;
  return (
    <>
      <Form error={!!error} loading={loading} onSubmit={handleSubmit}>
        <Message error={true} content={error ? error.message : "予期せぬエラーが発生しました"} />
        <Form.Field required={true}>
          <Form.Input label="ハンドルネーム" type="text" required={true} {...name} />
        </Form.Field>
        <Form.Field required={true}>
          <Form.Input label="代" type="text" required={true} {...generation} />
        </Form.Field>
        <Form.Field required={true}>
          <Form.Input label="キーワード" type="text" required={true} {...keyword} />
        </Form.Field>
        <Form.Field required={true}>
          <Form.Input label="キーワードのヒント" type="text" required={true} {...hint} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="twitter @以下" type="text" {...twitterId} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="自己紹介" type="text" required={true} {...content} />
        </Form.Field>
        <Form.Button>変更</Form.Button>
      </Form>
      {success && (
        <Message positive>
          <Message.Header>アカウントを更新しました!</Message.Header>
          <p>キーワードは相手と直接話す時以外では漏らさないように注意してください!</p>
        </Message>
      )}
    </>
  );
};

const Container: React.FC<{ user: Partial<Omit<UserWithAccount, "hasAccount">> }> = ({ user }) => {
  const { name, keyword, hint, twitterId, generation, content } = user;
  const hooks = {
    name: useTextInput(name),
    keyword: useTextInput(keyword),
    hint: useTextInput(hint),
    twitterId: useTextInput(twitterId),
    content: useTextInput(content),
    generation: useTextInput(generation ? String(generation) : undefined),
  };
  const req = {
    ...user,
    name: hooks.name.value,
    keyword: hooks.keyword.value,
    hint: hooks.hint.value,
    twitterId: hooks.twitterId.value,
    content: hooks.content.value,
    generation: parseInt(hooks.generation.value),
  } as UserWithAccount;

  console.log(req);

  const [submit, status] = useFetch<string>("/api/private/signup", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(req),
  });
  const handleSubmit = useCallback(() => {
    submit();
  }, [submit]);
  return <Component {...status} hooks={hooks} handleSubmit={handleSubmit} />;
};

export default Container;
