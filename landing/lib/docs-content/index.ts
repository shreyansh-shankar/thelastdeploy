import type { DocPage } from "./types";

// Introduction
import welcome from "./introduction/welcome";
import whyTld from "./introduction/why-tld";
import vision from "./introduction/vision";
import philosophy from "./introduction/philosophy";
import faq from "./introduction/faq";

// Getting Started
import installation from "./getting-started/installation";
import quickStart from "./getting-started/quick-start";
import firstLab from "./getting-started/first-lab";
import updating from "./getting-started/updating";
import troubleshooting from "./getting-started/troubleshooting";

// Labs
import labsOverview from "./labs/overview";
import learningPaths from "./labs/learning-paths";
import beginner from "./labs/beginner";
import intermediate from "./labs/intermediate";
import advanced from "./labs/advanced";
import upcoming from "./labs/upcoming";

// CLI
import cliOverview from "./cli/overview";
import cliLogin from "./cli/commands/login";
import cliLogout from "./cli/commands/logout";
import cliLab from "./cli/commands/lab";
import cliCheck from "./cli/commands/check";
import cliDoctor from "./cli/commands/doctor";
import cliUpdate from "./cli/commands/update";
import cliVersion from "./cli/commands/version";
import cliConfig from "./cli/commands/config";
import cliConfiguration from "./cli/configuration";
import cliAuthentication from "./cli/authentication";
import cliExamples from "./cli/examples";

// Architecture
import archOverview from "./architecture/overview";
import archMonorepo from "./architecture/monorepo";
import archBackend from "./architecture/backend";
import archFrontend from "./architecture/frontend";
import archCli from "./architecture/cli";
import archLabEngine from "./architecture/lab-engine";
import archDatabase from "./architecture/database";

// Contributing
import contribSetup from "./contributing/setup";
import contribFirstIssues from "./contributing/good-first-issues";
import contribStandards from "./contributing/coding-standards";
import contribPR from "./contributing/pull-requests";
import contribCoc from "./contributing/code-of-conduct";
import contribSecurity from "./contributing/security";

// Community
import discord from "./community/discord";
import github from "./community/github";
import roadmap from "./community/roadmap";
import changelog from "./community/changelog";
import sponsors from "./community/sponsors";

// Reference
import apiRef from "./reference/api";
import configRef from "./reference/configuration";
import envVars from "./reference/env-vars";
import exitCodes from "./reference/exit-codes";
import glossary from "./reference/glossary";

// Learn
import devopsFundamentals from "./learn/devops-fundamentals";
import dockerConcepts from "./learn/docker-concepts";
import linuxBasics from "./learn/linux-basics";
import kubernetesExplained from "./learn/kubernetes-explained";
import networkingEssentials from "./learn/networking-essentials";
import cicdConcepts from "./learn/cicd-concepts";

export const CONTENT_MAP: Record<string, DocPage> = {
  // Introduction
  "introduction/welcome": welcome,
  "introduction/why-tld": whyTld,
  "introduction/vision": vision,
  "introduction/philosophy": philosophy,
  "introduction/faq": faq,

  // Getting Started
  "getting-started/installation": installation,
  "getting-started/quick-start": quickStart,
  "getting-started/first-lab": firstLab,
  "getting-started/updating": updating,
  "getting-started/troubleshooting": troubleshooting,

  // Labs
  "labs/overview": labsOverview,
  "labs/learning-paths": learningPaths,
  "labs/beginner": beginner,
  "labs/intermediate": intermediate,
  "labs/advanced": advanced,
  "labs/upcoming": upcoming,

  // CLI
  "cli/overview": cliOverview,
  "cli/commands/login": cliLogin,
  "cli/commands/logout": cliLogout,
  "cli/commands/lab": cliLab,
  "cli/commands/check": cliCheck,
  "cli/commands/doctor": cliDoctor,
  "cli/commands/update": cliUpdate,
  "cli/commands/version": cliVersion,
  "cli/commands/config": cliConfig,
  "cli/configuration": cliConfiguration,
  "cli/authentication": cliAuthentication,
  "cli/examples": cliExamples,

  // Architecture
  "architecture/overview": archOverview,
  "architecture/monorepo": archMonorepo,
  "architecture/backend": archBackend,
  "architecture/frontend": archFrontend,
  "architecture/cli": archCli,
  "architecture/lab-engine": archLabEngine,
  "architecture/database": archDatabase,

  // Contributing
  "contributing/setup": contribSetup,
  "contributing/good-first-issues": contribFirstIssues,
  "contributing/coding-standards": contribStandards,
  "contributing/pull-requests": contribPR,
  "contributing/code-of-conduct": contribCoc,
  "contributing/security": contribSecurity,

  // Community
  "community/discord": discord,
  "community/github": github,
  "community/roadmap": roadmap,
  "community/changelog": changelog,
  "community/sponsors": sponsors,

  // Reference
  "reference/api": apiRef,
  "reference/configuration": configRef,
  "reference/env-vars": envVars,
  "reference/exit-codes": exitCodes,
  "reference/glossary": glossary,

  // Learn
  "learn/devops-fundamentals": devopsFundamentals,
  "learn/docker-concepts": dockerConcepts,
  "learn/linux-basics": linuxBasics,
  "learn/kubernetes-explained": kubernetesExplained,
  "learn/networking-essentials": networkingEssentials,
  "learn/cicd-concepts": cicdConcepts,
};

export function getPage(slug: string[]): DocPage | null {
  const key = slug.join("/");
  return CONTENT_MAP[key] ?? null;
}
