# Cursor Rules Documentation

This project uses the [Cursor Rules](https://docs.cursor.com/context/rules) system with the `.cursor/rules/` directory structure for maintaining development standards.

## Rule Files Structure

### `.cursor/rules/project-standards.mdc`

**Type**: Always Applied
**Scope**: All TypeScript/JavaScript files
**Purpose**: Core development standards including:

- Code style and formatting
- TypeScript standards
- React patterns
- File organization
- Naming conventions
- Commit message format

### `.cursor/rules/express-api-generation.mdc`

**Type**: Auto Attached
**Scope**: `src/api/**/*.ts` files
**Purpose**: Mandatory Express API structure including:

- 9-file structure requirement
- CRUD operation patterns
- Repository and service patterns
- Integration requirements

### `.cursor/rules/database-validation.mdc`

**Type**: Auto Attached
**Scope**: Repository, model, service files, and Prisma files
**Purpose**: Database and validation standards including:

- Prisma usage patterns
- Zod validation schemas
- Error handling patterns
- Query optimization

### `.cursor/rules/openapi-docs.mdc`

**Type**: Auto Attached
**Scope**: Documentation files (`**/*.docs.ts`, `src/__openApiDocs__/**/*.ts`)
**Purpose**: OpenAPI documentation standards including:

- Registry patterns
- Endpoint registration requirements
- Response code standards

## How It Works

According to the [Cursor documentation](https://docs.cursor.com/context/rules):

- **Always Applied** rules are included in every AI context
- **Auto Attached** rules are automatically included when you work with files matching their glob patterns
- Rules use the MDC format with frontmatter metadata
- They provide persistent context to Cursor's AI models

## Benefits

1. **Consistency**: Ensures all generated code follows project standards
2. **Automation**: Rules are applied automatically based on file context
3. **Version Control**: Rules are committed with the project
4. **Team Alignment**: All developers get the same AI guidance

## Usage

The rules are automatically applied by Cursor when:

- Working with files that match the glob patterns
- Using Chat or Inline Edit (Cmd/Ctrl + K)
- Generating new code or modifying existing code

No manual activation required - Cursor handles this automatically based on the file context.

## Rule Priority

1. **Project Standards** - Always active for code quality
2. **Context-Specific Rules** - Applied based on file type/location
3. **Integration Requirements** - Enforced for API consistency

These rules ensure that all AI-generated code maintains the strict architectural patterns required for this Express TypeScript project.
