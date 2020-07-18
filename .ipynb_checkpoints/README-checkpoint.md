# Git + GitHub As A Platform For Reproducible Data Analysis and Visualization

## Overview
This repository sets out the skeleton of an organizational structure used for data analysis and visualization. It is modified from an excellent GitHub repository from https://github.com/gchure for reproducible research in the biological sciences. I've made changes to the repository so that it can be readily used towards data analysis and visualization projects which rely on a combination of Python (or R) for data analysis and JavaScript libraries for visualization.

## How to Use
To use this template for your research, fork this repository, change the name
to something descriptive for your project, and adjust the licensing as you
see fit.

To use this repository for your own research, simply clone the repo using the following command:

```
git clone https://github.com/nikomc/data_analysis_visuals_template your_repo_title
```

> :warning: :warning: :warning: I wouldn't advise forking this repository. As you can only fork a given repository once, there is little utility in forking this repo if you hope to use it again in your future projects :warning: :warning: :warning:

## Layout

The repository is split into several different main directories, many of which have subdirectories. This structure has been designed to be easily navigable by humans and computers alike, allowing for rapid location of specific files and instructions. Within each directory is a `README.md` file which summarizes the purpose of that directory as well as some examples where necessary. This structure may not be perfect for your intended us and may need to be modified. Each section is briefly described below. 

### **`code`** 
Where all of the *executed* code lives. This includes pipelines and scripts. 
 * **`processing`**: Any code used to *transform* the data into another type should live here. This can include everything from parsing of text data, image segmentation/filtering, or simulations.
 * **`analysis`**: Any code to to *draw conclusions* from an experiment or data set. This may include regression, dimensionality reduction, or calculation of various quantities.
 * **`visualization`**: Any code used to create the actual data visualization. This could include scripts to generate chloropleth maps, or any other type of data visual. See the D3 gallery for examples: https://www.d3-graph-gallery.com/index.html
 * **`output_figures`**: Any output figures from the analysis and visualization folders.

### **`data`** 
All raw data collected as well as copies of the transformed data from your processing code. 

### **`tests`** 
All test suites for your code. *Any custom code you've written should be thoroughly and adequately tested to make sure you know how it is working.*

### **`software_module`** 
Custom code you've written that is *not* executed directly, but is called from files in the `code` directory. If you've written your code in Python, for example, this can be the root folder for your custom software module or simply house a file with all of your functions. 

### **`plan`** 
Where all of the files related to the planning phases of the data project reside.
 * **`data_plan`**: Any text relating to the approach for curating and processing data.
 * **`graphic_plan`**: Any text relating to how the final graphic should look, which may include embedded figures or sketches.
 * **`narrative`**: Text related to the story with which the visualization will be used.
 
### Required Files
There are some files which I consider to be mandatory for any project.

1. **`LICENSE`**: A legal protection of your work. *It is important to think deeply about the licensing of your work, and is not a decision to be made lightly. See [this useful site](https://choosealicense.com/) for more information about licensing and choosing the correct license for your project.*

2. **`README.md`**: A descriptive yet succinct description of your data project and information regarding the structure outlined below.


# License Information

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#">
  <a rel="license"
     href="http://creativecommons.org/publicdomain/zero/1.0/">
    <img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
  </a>
  <br />
  To the extent possible under law,
  <a rel="dct:publisher"
     href="github.com/nikomc/data_analysis_visuals_template">
    <span property="dct:title">Nicholas McCarty</span></a>
  has waived all copyright and related or neighboring rights to
  <span property="dct:title">A template repository for reproducible data analysis and visualization projects.</span>.
This work is published from:
<span property="vcard:Country" datatype="dct:ISO3166"
      content="US" about="github.com/gchure/reproducible_research">
  United States</span>.
</p>
