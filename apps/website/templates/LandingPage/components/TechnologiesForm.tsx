"use client"

import {
  Button,
  Checkbox as MantineCheckbox,
  Flex,
  Radio as MantineRadio,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import cnsPackageJson from "../../../../../packages/create-next-stack/package.json"
import { Anchor } from "../../../components/Anchor"
import { Checkbox } from "../../../components/Checkbox"
import { Radio } from "../../../components/Radio"
import { capitalizeFirstCharacter } from "../../../utils/capitalizeFirstCharacter"
import { objectToKeyToKeyMap } from "../../../utils/objectToKeyToKeyMap"
import { validateProjectName } from "../../../utils/validateProjectName"
import { CommandModal } from "./CommandModal"
import { WithInfoIconAndTooltip } from "./InfoIconTooltip"

const cssModulesValue = "css-modules"

type OptionKey =
  | "pnpm"
  | "yarn"
  | "npm"
  | "emotion"
  | "styledComponents"
  | "cssModules"
  | "tailwindCss"
  | "cssModulesWithSass"
  | "noStyling"
  | "reactHookForm"
  | "formik"
  | "prettier"
  | "mantine"
  | "chakra"
  | "materialUi"
  | "reactIcons"
  | "framerMotion"
  | "githubActions"
  | "formattingPreCommitHook"
  | "reactQuery"
  | "plausible"
  | "vercel"
  | "netlify"
  | "prisma"

const options = {
  pnpm: { key: "pnpm", value: "pnpm", label: "pnpm" },
  yarn: { key: "yarn", value: "yarn", label: "Yarn" },
  npm: { key: "npm", value: "npm", label: "npm" },
  emotion: { key: "emotion", value: "emotion", label: "Emotion" },
  styledComponents: {
    key: "styledComponents",
    value: "styled-components",
    label: "Styled Components",
  },
  cssModules: {
    key: "cssModules",
    value: cssModulesValue,
    label: "CSS Modules",
  },
  tailwindCss: {
    key: "tailwindCss",
    value: "tailwind-css",
    label: "Tailwind CSS",
  },
  cssModulesWithSass: {
    key: "cssModulesWithSass",
    value: "css-modules-with-sass",
    label: "CSS Modules with Sass",
  },
  noStyling: {
    key: "noStyling",
    value: cssModulesValue,
    label: "None",
  },
  reactHookForm: {
    key: "reactHookForm",
    value: "react-hook-form",
    label: "React Hook Form",
  },
  formik: { key: "formik", value: "formik", label: "Formik" },
  prettier: { key: "prettier", value: "prettier", label: "Prettier" },
  mantine: { key: "mantine", value: "mantine", label: "Mantine" },
  chakra: { key: "chakra", value: "chakra", label: "Chakra UI" },
  materialUi: { key: "materialUi", value: "material-ui", label: "Material UI" },
  reactIcons: { key: "reactIcons", value: "react-icons", label: "React Icons" },
  framerMotion: {
    key: "framerMotion",
    value: "framer-motion",
    label: "Framer Motion",
  },
  githubActions: {
    key: "githubActions",
    value: "github-actions",
    label: "GitHub Actions",
  },
  formattingPreCommitHook: {
    key: "formattingPreCommitHook",
    value: "formatting-pre-commit-hook",
    label: "Formatting Pre-Commit Hook",
  },
  reactQuery: {
    key: "reactQuery",
    value: "react-query",
    label: "React Query",
  },
  plausible: {
    key: "plausible",
    value: "plausible",
    label: "Plausible",
  },
  vercel: {
    key: "vercel",
    value: "vercel",
    label: "Vercel",
  },
  netlify: {
    key: "netlify",
    value: "netlify",
    label: "Netlify",
  },
  prisma: {
    key: "prisma",
    value: "prisma",
    label: "Prisma",
  },
} satisfies {
  [Key in OptionKey]: {
    key: Key
    value: string
    label: string
  }
}

const optionKeys = objectToKeyToKeyMap(options)

const packageManagerOptionKeys = [
  optionKeys.pnpm,
  optionKeys.yarn,
  optionKeys.npm,
] satisfies OptionKey[]
const stylingOptionKeys = [
  optionKeys.emotion,
  optionKeys.styledComponents,
  optionKeys.tailwindCss,
  optionKeys.cssModules,
  optionKeys.cssModulesWithSass,
  optionKeys.noStyling,
] satisfies OptionKey[]
const formStateManagementOptionKeys = [
  optionKeys.reactHookForm,
  optionKeys.formik,
] satisfies OptionKey[]
const formattingOptionKeys = [
  optionKeys.prettier,
  optionKeys.formattingPreCommitHook,
] satisfies OptionKey[]
const componentLibraryOptionKeys = [
  optionKeys.mantine,
  optionKeys.chakra,
  optionKeys.materialUi,
] satisfies OptionKey[]
const iconLibraryOptionKeys = [optionKeys.reactIcons] satisfies OptionKey[]
const animationOptionKeys = [optionKeys.framerMotion] satisfies OptionKey[]
const continuousIntegrationOptionKeys = [
  optionKeys.githubActions,
] satisfies OptionKey[]
const serverStateManagementLibraryOptionKeys = [
  optionKeys.reactQuery,
] satisfies OptionKey[]
const analyticsOptionKeys = [optionKeys.plausible] satisfies OptionKey[]
const deploymentOptionKeys = [
  optionKeys.vercel,
  optionKeys.netlify,
] satisfies OptionKey[]
const ormOptionKeys = [optionKeys.prisma] satisfies OptionKey[]

type RouterOption = "app" | "pages"

type ProjectName = string
type PackageManager = (typeof packageManagerOptionKeys)[number]
type Styling = (typeof stylingOptionKeys)[number]
type FormStateManagement = (typeof formStateManagementOptionKeys)[number]
type Formatting = (typeof formattingOptionKeys)[number]
type ComponentLibrary = (typeof componentLibraryOptionKeys)[number]
type IconLibrary = (typeof iconLibraryOptionKeys)[number]
type Animation = (typeof animationOptionKeys)[number]
type ContinuousIntegration = (typeof continuousIntegrationOptionKeys)[number]
type ServerStateManagementLibrary =
  (typeof serverStateManagementLibraryOptionKeys)[number]
type Analytics = (typeof analyticsOptionKeys)[number]
type Deployment = (typeof deploymentOptionKeys)[number]
type ORM = (typeof ormOptionKeys)[number]

type TechnologiesFormData = {
  projectName: ProjectName
  router: RouterOption
  packageManager: PackageManager
  styling: Styling
  formStateManagement: FormStateManagement[]
  formatting: Formatting[]
  componentLibraries: ComponentLibrary[]
  iconLibraries: IconLibrary[]
  animation: Animation[]
  continuousIntegration: ContinuousIntegration[]
  serverStateManagementLibraries: ServerStateManagementLibrary[]
  analytics: Analytics[]
  deployment: Deployment[]
  orm: ORM[]
}
const defaultFormData: TechnologiesFormData = {
  projectName: "my-app",
  router: "app",
  packageManager: optionKeys.pnpm,
  styling: optionKeys.tailwindCss,
  formStateManagement: [optionKeys.reactHookForm],
  formatting: [optionKeys.prettier, optionKeys.formattingPreCommitHook],
  componentLibraries: [optionKeys.mantine],
  iconLibraries: [],
  animation: [optionKeys.framerMotion],
  continuousIntegration: [optionKeys.githubActions],
  serverStateManagementLibraries: [optionKeys.reactQuery],
  analytics: [],
  deployment: [optionKeys.vercel],
  orm: [],
}
const formDataKeys = objectToKeyToKeyMap(defaultFormData)

const categoryLabels = {
  projectName: "Project Name",
  router: "Router",
  packageManager: "Package Manager",
  styling: "Styling",
  formStateManagement: "Form State Management",
  language: "Language",
  formatting: "Formatting",
  linting: "Linting",
  componentLibraries: "Component Libraries",
  iconLibraries: "Icon Libraries",
  animation: "Animation",
  continuousIntegration: "Continuous Integration",
  serverStateManagementLibraries: "Server State Management",
  analytics: "Analytics",
  deployment: "Deployment",
  orm: "ORMs",
} as const

export const TechnologiesForm: React.FC = () => {
  const { register, control, watch, formState, handleSubmit } =
    useForm<TechnologiesFormData>({
      defaultValues: defaultFormData,
    })

  const { errors } = formState

  const formValues = watch()

  const [isCommandModalShown, setIsModalShown] = React.useState(false)
  const [command, setCommand] = React.useState("")

  const handleSuccessfulSubmit: SubmitHandler<TechnologiesFormData> = (
    formData,
  ) => {
    const calculateCommand = (formData: TechnologiesFormData) => {
      const args = ["npx", `create-next-stack@${cnsPackageJson.version}`]

      args.push(`--router=${formData.router}`)
      args.push(`--package-manager=${options[formData.packageManager].value}`)
      args.push(`--styling=${options[formData.styling].value}`)

      const pushArgs = (selectedOptionKeys: Array<keyof typeof options>) => {
        selectedOptionKeys.forEach((optionKey) => {
          args.push(`--${options[optionKey].value}`)
        })
      }
      pushArgs(formData.formStateManagement)
      pushArgs(formData.formatting)
      pushArgs(formData.componentLibraries)
      pushArgs(formData.iconLibraries)
      pushArgs(formData.animation)
      pushArgs(formData.continuousIntegration)
      pushArgs(formData.serverStateManagementLibraries)
      pushArgs(formData.analytics)
      pushArgs(formData.deployment)
      pushArgs(formData.orm)

      const projectNameSegments = formData.projectName.split("/")
      const lastPartOfProjectName = projectNameSegments.pop()!
      args.push(lastPartOfProjectName)

      return args.join(" ")
    }

    setCommand(calculateCommand(formData))
    setIsModalShown(true)
  }

  const CheckboxesOfOptionKeys = (
    name:
      | "formStateManagement"
      | "formatting"
      | "componentLibraries"
      | "iconLibraries"
      | "animation"
      | "continuousIntegration"
      | "serverStateManagementLibraries"
      | "analytics"
      | "deployment"
      | "orm",
    optionKeys: Array<keyof typeof options>,
    validators?: {
      [key in keyof typeof options]?: Array<{
        isInvalid: boolean
        errorMessage: string
      }>
    },
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          validate: () =>
            !optionKeys.some((optionKey) =>
              validators?.[optionKey]?.some((validator) => validator.isInvalid),
            ),
        }}
        render={({ field: { ref: _, ...rest } }) => (
          <MantineCheckbox.Group {...rest}>
            <Flex direction="column" gap="12">
              {optionKeys.map((optionKey) => {
                return (
                  <div key={optionKey}>
                    <Checkbox
                      value={optionKey}
                      label={options[optionKey].label}
                    />
                    {validators?.[optionKey]?.map(
                      (validator) =>
                        validator.isInvalid && (
                          <Text
                            key={validator.errorMessage}
                            c="red"
                            fz="sm"
                            mt="4"
                          >
                            {validator.errorMessage}
                          </Text>
                        ),
                    )}
                  </div>
                )
              })}
            </Flex>
          </MantineCheckbox.Group>
        )}
      />
    )
  }

  const RadiosOfOptionKeys = (optionKeys: Array<keyof typeof options>) => {
    return (
      <Flex direction="column" gap="12">
        {optionKeys.map((optionKey) => (
          <Radio
            key={optionKey}
            value={optionKey}
            label={options[optionKey].label}
          />
        ))}
      </Flex>
    )
  }

  return (
    <>
      <CommandModal
        opened={isCommandModalShown}
        command={command}
        onClose={() => {
          setIsModalShown(false)
        }}
      />
      <form onSubmit={handleSubmit(handleSuccessfulSubmit)}>
        <Title order={2} fz="xl" mb="24">
          Pick your technologies
        </Title>

        <Flex direction="column" gap="64">
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: "32", md: "64" }}
          >
            <Flex direction="column" gap="32" style={{ flexBasis: "100%" }}>
              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  <WithInfoIconAndTooltip
                    tooltip={`Project names must be valid npm package names.`}
                  >
                    {categoryLabels.projectName}
                  </WithInfoIconAndTooltip>
                </Title>
                <TextInput
                  {...register(formDataKeys.projectName, {
                    validate: validateProjectName,
                  })}
                  error={
                    errors.projectName?.message != null
                      ? capitalizeFirstCharacter(errors.projectName.message) +
                        "."
                      : undefined
                  }
                />
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  <WithInfoIconAndTooltip tooltip="App Router is the default and recommended choice for new Next.js projects. Pages Router is the legacy routing system.">
                    {categoryLabels.router}
                  </WithInfoIconAndTooltip>
                </Title>
                <Controller
                  name={formDataKeys.router}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref: _, ...rest } }) => (
                    <MantineRadio.Group {...rest}>
                      <Flex direction="column" gap="12">
                        <Radio value="app" label="App Router" />
                        <Radio value="pages" label="Pages Router" />
                      </Flex>
                    </MantineRadio.Group>
                  )}
                />
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.packageManager}
                </Title>
                <Controller
                  name={formDataKeys.packageManager}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref: _, ...rest } }) => (
                    <MantineRadio.Group {...rest}>
                      {RadiosOfOptionKeys(packageManagerOptionKeys)}
                    </MantineRadio.Group>
                  )}
                />
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.styling}
                </Title>
                <Controller
                  name={formDataKeys.styling}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref: _, ...rest } }) => (
                    <MantineRadio.Group {...rest}>
                      {RadiosOfOptionKeys(stylingOptionKeys)}
                    </MantineRadio.Group>
                  )}
                />
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.formStateManagement}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.formStateManagement,
                  formStateManagementOptionKeys,
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.serverStateManagementLibraries}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.serverStateManagementLibraries,
                  serverStateManagementLibraryOptionKeys,
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.analytics}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.analytics,
                  analyticsOptionKeys,
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.orm}
                </Title>
                {CheckboxesOfOptionKeys(formDataKeys.orm, ormOptionKeys)}
              </Flex>
            </Flex>

            <Flex direction="column" gap="32" style={{ flexBasis: "100%" }}>
              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.language}
                </Title>
                <MantineCheckbox.Group value={["TypeScript"]}>
                  <Flex direction="column" gap="12">
                    <Checkbox
                      value="TypeScript"
                      disabled
                      label={
                        <WithInfoIconAndTooltip tooltip="TypeScript is currently required.">
                          TypeScript
                        </WithInfoIconAndTooltip>
                      }
                    />
                  </Flex>
                </MantineCheckbox.Group>
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.linting}
                </Title>
                <MantineCheckbox.Group value={["ESLint"]}>
                  <Flex direction="column" gap="12">
                    <Checkbox
                      value="ESLint"
                      disabled
                      label={
                        <WithInfoIconAndTooltip tooltip="ESLint is currently required.">
                          ESLint
                        </WithInfoIconAndTooltip>
                      }
                    />
                  </Flex>
                </MantineCheckbox.Group>
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.formatting}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.formatting,
                  formattingOptionKeys,
                  {
                    [optionKeys.formattingPreCommitHook]: [
                      {
                        isInvalid:
                          formValues.formatting.includes(
                            optionKeys.formattingPreCommitHook,
                          ) &&
                          !formValues.formatting.includes(optionKeys.prettier),
                        errorMessage:
                          "Formatting pre-commit hook requires Prettier.",
                      },
                    ],
                  },
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.componentLibraries}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.componentLibraries,
                  componentLibraryOptionKeys,
                  {
                    [optionKeys.chakra]: [
                      {
                        isInvalid:
                          formValues.componentLibraries.includes(
                            optionKeys.chakra,
                          ) && formValues.styling !== optionKeys.emotion,
                        errorMessage: "Chakra UI requires Emotion",
                      },
                    ],
                    [optionKeys.materialUi]: [
                      {
                        isInvalid:
                          formValues.componentLibraries.includes(
                            optionKeys.materialUi,
                          ) && formValues.styling !== optionKeys.emotion,
                        errorMessage: "Material UI requires Emotion",
                      },
                    ],
                  },
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.iconLibraries}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.iconLibraries,
                  iconLibraryOptionKeys,
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.animation}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.animation,
                  animationOptionKeys,
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.continuousIntegration}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.continuousIntegration,
                  continuousIntegrationOptionKeys,
                )}
              </Flex>

              <Flex direction="column" gap="16">
                <Title order={3} fz="md">
                  {categoryLabels.deployment}
                </Title>
                {CheckboxesOfOptionKeys(
                  formDataKeys.deployment,
                  deploymentOptionKeys,
                )}
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="row" justify={{ base: "flex-start", sm: "center" }}>
            <Button type="submit" color="violet">
              Create Next Stack
            </Button>
          </Flex>

          <Text ta={{ base: "left", sm: "center" }}>
            Missing your favorite technology or encountering a bug? <br />
            <Anchor
              href="https://github.com/akd-io/create-next-stack/issues"
              target="_blank"
            >
              Open an issue on GitHub
            </Anchor>
          </Text>
        </Flex>
      </form>
    </>
  )
}
