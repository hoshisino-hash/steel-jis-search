# 千宵の最終キャラ（Rive）配置ガイド

アプリ（`index.html` の `Renderer`）は、ここに最終キャラのファイルが揃うと
**自動でSVG暫定版からRiveに切り替えます**。揃っていなければSVGのまま動きます。

## 置くファイル

| ファイル | 置き場所 | 入手元 |
| --- | --- | --- |
| `rive.min.js` | `tasogare/lib/rive.min.js`（このフォルダ） | Rive Web (JS) ランタイム。配布物の `rive.min.js` を配置 |
| `chiyo.riv` | `tasogare/chiyo.riv`（アプリ直下） | Riveエディタで作成・書き出した千宵のモデル |

> どちらも未配置でもアプリは壊れません（SVG暫定版で継続）。
> 配置後は Service Worker のキャッシュ版数（`service-worker.js` の `CACHE_VERSION`）を
> 上げると、利用者側にも確実に反映されます。

## Riveファイルの「契約」（この名前で作ってください）

`Renderer` はこの命名でモデルを駆動します。Riveエディタ側でこの通りに作成すれば、
コードを変えずにそのまま動きます。

- **ステートマシン名**: `Chiyo`
- **入力（State Machine Inputs）**:
  | 入力名 | 型 | 役割 |
  | --- | --- | --- |
  | `working` | Boolean | 作業中（書きもの・前傾・筆記） |
  | `resting` | Boolean | 小休止／休憩（手を止め顔を上げる） |
  | `idle` | Boolean | 待機（呼吸・まばたき・見守り） |
  | `mouth` | Number(0–100) | 口の開き。発話中の口パクに使用 |

> 命名を変えたい場合は `index.html` の `Renderer` 冒頭コメントの契約に合わせて
> 該当行（`I.working` 等）を1か所修正するだけで対応できます。

## 「喋る」について

- v1の声は端末標準の音声合成（Web Speech API）。発話中は `mouth` を擬似的に開閉。
- 収録ボイス／VOICEVOX等の音声ファイルに差し替える場合は、Web Audioの
  `AnalyserNode` で実波形に合わせた口パク（リップシンク）へ拡張可能。

詳細な制作工程・作画プロンプトは `../キャラクター制作.md` を参照。
