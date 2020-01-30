## Ограничения

Держите проект с конфигами чистым. 
1. Никогда не ссылайтесь на него или конфиги в нем явно.
2. Обращайтесь к проекту как к модулю в node_modules и только в корне монорепо.

## Что включено в конфиги?

1. `.eslintrc` и `.eslintignore` - [docs](https://eslint.org/) линтинг js и ts
2. `.npmrc` - [docs](https://docs.npmjs.com/configuring-npm/npmrc.html) если мы хотим иметь свой источник пакетов вроде [verdaccio](https://github.com/verdaccio/verdaccio) 
3. `.prettierrc` - форматирование в соответствии с `eslint` и `stylelint`
4. `.stylelintrc` - линтинг `css` и опционально `scss` или `styled-components`
5. `lint-staged` - [docs](https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo) запускает все линтеры и `prettier` в хуке `hasky`
6. `hasky` - [docs](https://github.com/typicode/husky) удобная оболочка для `gitHooks`

## Как использовать `tsconfig.json`?

1. В `shared` версии не следует указывать платформозависимые части вроде `lib-dom`, т.к. в `worker` и `mobile` версиях этот конфиг использовать будет нельзя.
2. Вложенные свойства не расширяются, а переопределяются при extend.
3. Пути всегда указываются от месоположения файла в котором они определены, а не от того в который сделан `extend`. Лучше не указывать пути в `shared` версии.
4. Все `node_modules/@types` включаются при первом `import` из них или их зависимостей. 
5. Чтобы добавить свои типы в `node_modules/@types`, достаточно в `package.json` пакета указать `{ "name": "@types/<my-types-name>" }`.
6. Не делайте `type alias` в `tsconfig` проекта модули из которого вы будете брать по `import { x } from '@my/my-lib/path/to/file'`,
 а не из корня `import { x } from '@my/my-lib'`.
 
## Как использовать `Stylelint`?
Включите автоопределение в WebStorm:
```bash
File | Settings | Languages & Frameworks | Style Sheets | Stylelint
```

## Как использовать `ESLint`?

Включите автоопределение в WebStorm:
```bash
File | Settings | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint
```

## Как использовать `.prettierrc`?

Добавить watcher для всех типов файлов в WebStorm: `File | Settings | Tools | File Watchers`.

Проверить что в WebStorm `prettier` найден: `File | Settings | Languages & Frameworks | JavaScript | Prettier`.

Замечания: 
1. Это нужно делать для каждого проекта при открытии его в WebStorm.
2. (опционально) Если нужно выкачать старую ветку следует отключить watcher, иначе в коммит попадут отформатированные файлы.
3. Нужно всегда помечать папку build как исключенную для watcher.
3. Нужно всегда запускать prettier в прекоммит хуке.

## Как использовать `.npmrc`?

Добавить `registry=http://localhost:4873` и установить приватный прокси источник пакетов вроде:

```bash
$ yarn global add verdaccio
$ verdaccio &

$ npm set registry http://localhost:4873/
$ npm adduser --registry http://localhost:4873
Username: test
Password: ***
Email: ***
```

## Почему нет конфига `X`?

1. `JSLint` - устарел в пользу `JSHint`
2. `TSLint` - устарел в пользу `ESLint`
3. `JSHint` - устарел в пользу `ESLint`
4. `.editorconfig` - не имеет смысла при наличии `ESLint` и `prettier`
5. `.markdownlint` - не имеет хорошей поддержки, его судьба под вопросом