# HANDOFF — create-next-stack (akd-io) + create-stack-next

**Última actualización:** 2026-07-14
**Sesión origen:** webchat Mini, sesión CSN+CNS

---

## Contexto general

Gonzo decidió colaborar con `create-next-stack` (akd-io) en lugar de competir. `create-stack-next` (nuestro) queda como "fork opinado" / laboratorio — lo que funciona se manda upstream. Todo lo que vaya al repo de akd-io va en inglés. Esta sesión es exclusivamente CSN + CNS.

## Estado actual

- **PR #280 abierto:** Bun support (#262) — https://github.com/akd-io/create-next-stack/pull/280
- Esperando review de akd-io
- CI: GitGuardian ✅, Vercel CI awaiting maintainer approval (normal para PRs externos)
- Repo forkeado: github.com/gonzoblasco/create-next-stack
- Clonado en `projects/create-next-stack`, rama `feature/262-add-bun-support`

## Plan de PRs — orden priorizado y por qué

### 1. ✅ Bun support (#262) — HECHO (PR #280)

- **Por qué primero:** Ya lo teníamos implementado en CSN. Sabíamos hacerlo. PR rápido y de alto valor (Bun es el PM más nuevo y solicitado).
- **Commits:**
  - `feat(cli): add Bun as a package manager option (#262)`
  - `test(e2e): add E2E test for Bun package manager (#262)`
- **Archivos:** 9 files, +90/-2 líneas

### 2. 🔜 Vitest (#224) — próximo PR

- **Por qué segundo:** Ironía — ellos ya migraron a Vitest internamente (reemplazaron Jest) pero NO lo ofrecen como opción del scaffold. Es un gap obvio. Además nosotros lo usamos en CSN, lo conocemos.
- **Cuándo:** en ~2 semanas si no hay respuesta al PR de Bun. Si responden antes, seguimos el ritmo que marquen.
- **Issue:** https://github.com/akd-io/create-next-stack/issues/224
- **Comentario de akd-io:** remite a https://nextjs.org/docs/pages/building-your-application/optimizing/testing

### 3. Supabase (#249)

- **Por qué tercero:** Lo dominamos por SoporteML (Supabase + pgvector + Edge Functions). Es un plugin más grande (setup de cliente, env vars, tipos, opcional DB) pero sabemos exactamente cómo hacerlo.
- **Issue:** https://github.com/akd-io/create-next-stack/issues/249

### 4. Auth.js + ShadCN (#268)

- **Por qué:** Muy pedido (issue sin body, solo título, pero ShadCN es lo más usado hoy). Auth.js (antes NextAuth) es el estándar de auth en Next.js. Juntos son un combo que mucha gente quiere.
- **Issue:** https://github.com/akd-io/create-next-stack/issues/268

### 5. Architecture review (#272)

- **Por qué es el "golazo":** Si entramos acá, nos posicionamos como alguien que entiende la arquitectura completa del proyecto, no solo un contributor que arregla typos. Es el salto de "colaborador" a "alguien que piensa el proyecto".
- **Issue:** https://github.com/akd-io/create-next-stack/issues/272

### 6. OpenSpec como feature propuesta

- **Por qué último:** Es nuestra tarjeta de presentación — Spec-Driven Development embebido. Pero proponerlo sin credibilidad previa = ruido. Después de 2-3 PRs merged, proponemos OpenSpec con peso real.
- **No tiene issue** — se propondría como discussion o feature request nueva.

## Issues chicos para ganar credibilidad rápida (si hace falta)

Si akd-io no responde al PR grande y queremos mantener momentum, estos son fixes chicos y claros:

- **#277 — Remove `React.FC` usage (CLI):** El website ya está hecho (#275), falta el CLI. Limpieza de código, bien definido.
- **#231 — CLI crashes if git username/email isn't specified:** Bug claro con reproducción. akd-io dejó pistas de cómo arreglarlo en los comments.
- **#266 — prettier-plugin-organize-imports:** Ellos ya lo usan internamente (Phase 4 del #271) pero no lo ofrecen como opción del scaffold.

## Deuda congelada

- **Website de CNS** (create-next-stack.com): actualizarlo para soportar Bun y futuras opciones. Está en el FREEZER — deuda moral después del CLI. No mezclar en el PR del CLI.

## Estructura del repo de akd-io (para referencia)

- Monorepo con pnpm + Turbo
- `packages/create-next-stack/` — el CLI (oclif, TypeScript, ESM)
  - `src/main/plugins/` — un .ts por tecnología/plugin
  - `src/main/setup/setup.ts` — registro de plugins
  - `src/main/steps.ts` — orden de steps
  - `src/main/create-next-stack-types.ts` — tipos y opciones de flags
  - `src/main/helpers/package-manager-utils.ts` — mapas por PM
  - `src/main/plugins/create-next-stack/sort-orders/technologies.ts` — sort order de technologies
  - `src/tests/e2e/tests/` — un test por PM/styling/config
- `apps/website/` — Next.js 16, Mantine, form interactivo
- `CONTRIBUTING.md` — guía completa de cómo agregar plugins
- Pre-commit hook actualiza README automáticamente
