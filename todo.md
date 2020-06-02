# bingo やること


* clean architectureを採用することにする..?

* domain
* usecase
    * ビジネスロジックを書く
    * interactorにてロジックを書く
* interface
    * usecase層に使ってもらうためのDBやAPIなどのインターフェースを提供する
    * controller
        * 入力
    * presenter
        * UIとかに入力に対する結果を渡すやつ
    * gateways
        * dbを操作するためのレポジトリ
* infrastructure
    * インターフェースを実装する`
    *db, viewなど..?
* controller => I <|= usecase => I <|= Presenter

アカウント情報を持ってくる必要アリ.
slackIdとか

auth0認証成功したあとに, slack_idでテーブルを検索, テーブルにそのSlackidがない場合は,
mis-bingoのアカウントを作るページに飛ばす. (frontendでは, 認証できていないなら, /loginに飛ばす. apiは/private)
認証に失敗した場合は, /join_-misw に飛ばす.

アカウント作成ページでは, 色々入力してもらう
/private/signupのapiを叩いてもらう

* ユーザー作成
ユーザーが作成サれたら, 
ビンゴカードを生成する.
人数が25人に満たない場合は, 適当に埋める.

ビンゴカードはリロードできるようにする./api/private/reload-bingo
ユーザー数が25人に満たない時は, まだ揃っていない由を表示する.

/users でユーザー一覧を見られるようにする.

/usres/:id から /api/private/challenge
{
    to: number
    keyword: string
}

/api/private/challenge POST
/api/private/bingo GET POST {}
/api/private/signup
/api/private/profile GET POST
/api/private/users GET

/
/users
/users/:id
/bingo
/signup
/join-misw

hint
