<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { emptyWork, useWorks } from '@/stores/works'
import { resolveImage, type Work } from '@/data/works'
import { fileToCompressedDataUrl } from '@/utils/image'

const PASSWORD = 'wayke2026'
const AUTH_KEY = 'wayke.admin.authed'

const store = useWorks()

const authed = ref(sessionStorage.getItem(AUTH_KEY) === '1')
const passwordInput = ref('')
const authError = ref('')

function login(): void {
  if (passwordInput.value === PASSWORD) {
    authed.value = true
    sessionStorage.setItem(AUTH_KEY, '1')
    authError.value = ''
  } else {
    authError.value = 'Неверный пароль'
  }
}
function logout(): void {
  authed.value = false
  sessionStorage.removeItem(AUTH_KEY)
}

const draft = reactive<Work>(emptyWork())
const tagsInput = ref('')
const isNew = ref(false)
const editorOpen = ref(false)
const uploadError = ref('')
const busy = ref(false)

function openNew(): void {
  Object.assign(draft, emptyWork())
  tagsInput.value = ''
  isNew.value = true
  editorOpen.value = true
  uploadError.value = ''
}
function openEdit(work: Work): void {
  Object.assign(draft, JSON.parse(JSON.stringify(work)))
  tagsInput.value = work.tags.join(', ')
  isNew.value = false
  editorOpen.value = true
  uploadError.value = ''
}
function closeEditor(): void {
  editorOpen.value = false
}

async function onFile(event: Event): Promise<void> {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  busy.value = true
  uploadError.value = ''
  try {
    draft.image = await fileToCompressedDataUrl(file)
    draft.imageKey = undefined
  } catch (e) {
    uploadError.value = e instanceof Error ? e.message : 'Ошибка загрузки'
  } finally {
    busy.value = false
  }
}
function clearCover(): void {
  draft.image = undefined
  draft.imageKey = undefined
}

function saveDraft(): void {
  draft.tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  if (!draft.title.trim() || !draft.url.trim()) {
    uploadError.value = 'Заполните хотя бы название и ссылку'
    return
  }
  if (isNew.value) store.add({ ...draft })
  else store.update(draft.id, { ...draft })
  editorOpen.value = false
}

function download(name: string, href: string): void {
  const a = document.createElement('a')
  a.href = href
  a.download = name
  a.click()
}
function exportAll(): void {
  const list = store.items.map((work) => {
    const copy: Work = { ...work, tags: [...work.tags] }
    if (copy.image) {
      delete copy.image
      copy.imageKey = work.id
    }
    return copy
  })
  const blob = new Blob([JSON.stringify(list, null, 2) + '\n'], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  download('works.json', url)
  URL.revokeObjectURL(url)
  store.items.forEach((work) => {
    if (work.image) download(`${work.id}.jpg`, work.image)
  })
}
function importJson(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result as string) as Work[]
      if (!Array.isArray(parsed)) throw new Error('bad')
      store.replaceAll(parsed)
    } catch {
      alert('Не удалось прочитать JSON — проверьте файл.')
    }
  }
  reader.readAsText(file)
}
function resetAll(): void {
  if (confirm('Вернуть список работ к исходному? Ваши изменения пропадут.')) store.resetToDefault()
}
</script>

<template>
  <div class="admin">
    <div v-if="!authed" class="gate">
      <form class="gate__box" @submit.prevent="login">
        <h1 class="gate__title">Админка</h1>
        <p class="gate__hint">Введите пароль для управления портфолио.</p>
        <input v-model="passwordInput" type="password" class="inp" placeholder="Пароль" autofocus />
        <p v-if="authError" class="gate__err">{{ authError }}</p>
        <button type="submit" class="btn-a btn-a--solid">Войти</button>
        <RouterLink to="/" class="gate__back">← на сайт</RouterLink>
      </form>
    </div>

    <div v-else class="panel">
      <header class="panel__top">
        <div>
          <h1 class="panel__title">Портфолио — админка</h1>
          <p class="panel__sub">
            Работ: {{ store.items.length }} · данные хранятся в этом браузере
          </p>
        </div>
        <div class="panel__actions">
          <RouterLink to="/" class="btn-a">← Смотреть сайт</RouterLink>
          <button class="btn-a" @click="logout">Выйти</button>
        </div>
      </header>

      <div class="toolbar">
        <button class="btn-a btn-a--solid" @click="openNew">+ Добавить работу</button>
        <button class="btn-a" @click="exportAll">↓ Экспорт</button>
        <label class="btn-a">
          ↑ Импорт JSON
          <input type="file" accept="application/json" hidden @change="importJson" />
        </label>
        <button class="btn-a btn-a--danger" @click="resetAll">Сбросить</button>
      </div>

      <p class="note">
        Чтобы изменения увидели посетители — нажмите «Экспорт»: works.json положите в src/data/,
        скачанные картинки — в src/assets/img/works/, затем передеплойте. Локально всё сохраняется
        автоматически.
      </p>

      <ul class="list">
        <li v-for="(work, i) in store.items" :key="work.id" class="row">
          <span class="row__idx">{{ work.index }}</span>
          <div class="row__thumb" :class="{ 'row__thumb--blank': !resolveImage(work) }">
            <img v-if="resolveImage(work)" :src="resolveImage(work)" :alt="work.title" />
            <span v-else>нет обложки</span>
          </div>
          <div class="row__info">
            <b class="row__title">{{ work.title }}</b>
            <span class="row__kind">{{ work.kind || '—' }} · {{ work.year }}</span>
            <a class="row__url" :href="work.url" target="_blank" rel="noopener">{{ work.url }}</a>
          </div>
          <div class="row__ops">
            <button class="ico" :disabled="i === 0" title="Вверх" @click="store.move(work.id, -1)">
              ↑
            </button>
            <button
              class="ico"
              :disabled="i === store.items.length - 1"
              title="Вниз"
              @click="store.move(work.id, 1)"
            >
              ↓
            </button>
            <button class="btn-a" @click="openEdit(work)">Редактировать</button>
            <button class="ico ico--danger" title="Удалить" @click="store.remove(work.id)">
              ✕
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="authed && editorOpen" class="modal" @click.self="closeEditor">
      <div class="editor">
        <div class="editor__head">
          <h2>{{ isNew ? 'Новая работа' : 'Редактирование' }}</h2>
          <button class="ico" @click="closeEditor">✕</button>
        </div>

        <div class="editor__body">
          <div class="editor__cover" :class="{ 'editor__cover--blank': !resolveImage(draft) }">
            <img v-if="resolveImage(draft)" :src="resolveImage(draft)" alt="обложка" />
            <span v-else>Обложка не выбрана</span>
          </div>
          <div class="editor__cover-ops">
            <label class="btn-a btn-a--solid">
              {{ busy ? 'Загрузка…' : 'Загрузить скриншот' }}
              <input type="file" accept="image/*" hidden :disabled="busy" @change="onFile" />
            </label>
            <button v-if="resolveImage(draft)" class="btn-a" @click="clearCover">Убрать</button>
          </div>
          <p v-if="uploadError" class="editor__err">{{ uploadError }}</p>

          <label class="fld"
            ><span>Название *</span><input v-model="draft.title" class="inp"
          /></label>
          <label class="fld"
            ><span>Категория</span><input v-model="draft.kind" class="inp"
          /></label>
          <label class="fld"
            ><span>Описание</span><textarea v-model="draft.description" class="inp" rows="3" />
          </label>
          <label class="fld"
            ><span>Ссылка *</span><input v-model="draft.url" class="inp" placeholder="https://…"
          /></label>
          <div class="editor__two">
            <label class="fld"><span>Год</span><input v-model="draft.year" class="inp" /></label>
            <label class="fld fld--check">
              <input v-model="draft.live" type="checkbox" /><span>Метка «в проде»</span>
            </label>
          </div>
          <label class="fld"
            ><span>Теги (через запятую)</span
            ><input v-model="tagsInput" class="inp" placeholder="Vue 3, TypeScript"
          /></label>
        </div>

        <div class="editor__foot">
          <button class="btn-a" @click="closeEditor">Отмена</button>
          <button class="btn-a btn-a--solid" @click="saveDraft">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  cursor: auto;
}
.gate {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 20px;
}
.gate__box {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 36px 30px;
}
.gate__title {
  font-family: var(--display);
  font-size: 2rem;
}
.gate__hint {
  color: var(--muted);
  font-size: 0.9rem;
  margin-top: -6px;
}
.gate__err {
  color: var(--accent);
  font-size: 0.85rem;
}
.gate__back {
  color: var(--muted);
  font-size: 0.85rem;
  text-align: center;
}
.gate__back:hover {
  color: var(--accent);
}

.panel {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}
.panel__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}
.panel__title {
  font-family: var(--display);
  font-size: 1.8rem;
}
.panel__sub {
  color: var(--muted);
  font-size: 0.88rem;
  margin-top: 6px;
}
.panel__actions {
  display: flex;
  gap: 10px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.note {
  color: var(--muted);
  font-size: 0.85rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 26px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.row {
  display: grid;
  grid-template-columns: auto 96px 1fr auto;
  gap: 18px;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px;
}
.row__idx {
  font-family: var(--display);
  font-weight: 800;
  color: var(--accent);
}
.row__thumb {
  width: 96px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-soft);
}
.row__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.row__thumb--blank {
  display: grid;
  place-items: center;
  font-size: 0.68rem;
  color: var(--dim);
}
.row__info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.row__title {
  font-size: 1.05rem;
}
.row__kind {
  color: var(--muted);
  font-size: 0.82rem;
}
.row__url {
  color: var(--dim);
  font-size: 0.78rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row__url:hover {
  color: var(--accent);
}
.row__ops {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--body);
  font-weight: 600;
  font-size: 0.82rem;
  padding: 10px 16px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--text);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    color 0.2s;
}
.btn-a:hover {
  border-color: var(--text);
}
.btn-a--solid {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.btn-a--solid:hover {
  background: #e8331f;
}
.btn-a--danger:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.ico {
  width: 36px;
  height: 36px;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.ico:hover:not(:disabled) {
  border-color: var(--text);
}
.ico:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.ico--danger:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.inp {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  color: var(--text);
  padding: 12px 14px;
  font-size: 0.95rem;
  font-family: var(--body);
}
.inp:focus {
  outline: none;
  border-color: var(--accent);
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}
.editor {
  width: 100%;
  max-width: 540px;
  max-height: 92vh;
  overflow: auto;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
}
.editor__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 24px;
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  background: var(--surface);
}
.editor__head h2 {
  font-family: var(--display);
  font-size: 1.4rem;
}
.editor__body {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.editor__cover {
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-soft);
  border: 1px solid var(--line);
}
.editor__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.editor__cover--blank {
  display: grid;
  place-items: center;
  color: var(--dim);
  font-size: 0.9rem;
}
.editor__cover-ops {
  display: flex;
  gap: 10px;
}
.editor__err {
  color: var(--accent);
  font-size: 0.85rem;
}
.editor__two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: end;
}
.fld {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.fld > span {
  font-size: 0.78rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.fld--check {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.fld--check > span {
  text-transform: none;
  letter-spacing: 0;
  color: var(--text);
  font-size: 0.95rem;
}
.editor__foot {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 18px 24px;
  border-top: 1px solid var(--line);
  position: sticky;
  bottom: 0;
  background: var(--surface);
}
@media (max-width: 640px) {
  .row {
    grid-template-columns: auto 1fr;
    gap: 12px;
  }
  .row__thumb {
    display: none;
  }
  .row__ops {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}
</style>
