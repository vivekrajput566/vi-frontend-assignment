# Vidyayatan Infotech : Frontend Hiring Assignment

## How to sumbit the Assignment : [LINK](https://docs.google.com/forms/d/e/1FAIpQLSd-2gS4piDlG4IvAhW-e0494Z4oNiw04xoiTFZ9VOxf-QtVKQ/viewform)

-   Fork this repository
-   Solve the tasks and commit the changes in your forked repository (**DO NOT** open a PR on this repository)
-   Deploy the changes to your preferred vendor (we recommend [Render](https://render.com/), [Vercel](https://vercel.com/) and [netlify](https://www.netlify.com/))
-   Submit the assignment using [this google form](https://docs.google.com/forms/d/e/1FAIpQLSd-2gS4piDlG4IvAhW-e0494Z4oNiw04xoiTFZ9VOxf-QtVKQ/viewform)

## Project setup instructions

1. Install `nvm` to manage node versions, Make sure you are using Node.JS `v21.0.0`
1. Install `pnpm` from [LINK](https://pnpm.io/)
1. Make sure that your vs-code is using same ts version as the current project
1. Run `pnpm install` to install dependencies
1. Run `pnpm run dev` to start dev server
1. Run `pnpm run precommit` to check if your code passess ts checks and linter checks

## Assignment Tasks

### 1. **Add a new checkbox column**

-   [ ] Create a new checkbox column as the first column
-   [ ] On checking the column the selected row should be highlighted i.e background should change
-   [ ] Only a single column can be selected at a time across pages

**Examples:**

First column as a checkbox, on selecting the row notice the background of selected row is slightly different from other rows
![First column](./.github/demo-images/task1_1.png)
![Single select](./.github/demo-images/task1_2.gif)

### 2. **Sticky Columns**

-   [ ] Create first 2 columns as sticky columns
-   [ ] On hovering over the row the entire row's background should be highlighted incluing the sticky columns
-   [ ] To test this change either use mobile view or decrease the width of the table

![Sticky columns](./.github/demo-images/task2_1.gif)

### 3. **Resizable Columns**

-   [ ] Create resizable columns, i.e. the width of columns should increase or decrease depending on users interaction
-   [ ] If the content is too big to fit in a column, the content should not overflow out of the column i.e. overflow-hidden should be enforced

![Resizable columns](./.github/demo-images/task3_1.gif)
