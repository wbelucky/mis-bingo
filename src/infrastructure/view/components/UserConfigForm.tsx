import React, { useCallback, ChangeEvent } from "react";
import { Form, Message, Image } from "semantic-ui-react";
import { UserWithAccount } from "../../../domain/user";
import { useTextInput } from "../hooks/form";
import { FrontendError } from "../hooks/network";

type ConfigurableProp = Pick<UserWithAccount, "name" | "keyword" | "hint" | "twitterId" | "content" | "generation">;
type InputHooks = {
  [P in keyof ConfigurableProp]: { value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
};

type ContainerProps = {
  user: Partial<Omit<UserWithAccount, "hasAccount">>;
  onSubmit: (user: UserWithAccount) => void;
  status: { error: FrontendError | null; loading: boolean; success: boolean };
};
type ComponentProps = {
  error?: FrontendError | null;
  loading?: boolean;
  success?: boolean;
  hooks: InputHooks;
  picture: string;
  handleSubmit: () => void;
};

const Component: React.FC<ComponentProps> = ({ loading, error, hooks, handleSubmit, success, picture }) => {
  const { name, keyword, hint, twitterId, content, generation } = hooks;
  return (
    <>
      <Image src={picture} width="80px" />
      <p>画像はSlackアイコンを変更することで適用できます!</p>
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
          <Form.Input label="キーワードを得るためのヒント(出没場所/時間等)" type="text" required={true} {...hint} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="自己紹介" type="text" required={true} {...content} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="twitter @以下" type="text" {...twitterId} />
        </Form.Field>
        <Form.Button>提出</Form.Button>
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

const Container: React.FC<ContainerProps> = ({ user, onSubmit, status }) => {
  const { name, keyword, hint, twitterId, generation, content, picture } = user;
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

  const handleSubmit = useCallback(() => {
    onSubmit(req);
  }, [onSubmit, req]);
  return <Component {...status} hooks={hooks} handleSubmit={handleSubmit} picture={picture as string} />;
};

export default Container;
