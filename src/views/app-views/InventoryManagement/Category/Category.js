import React , {useState} from "react";


import { Tabs , Button} from "antd";
import Icon from '@ant-design/icons'

import { InventoryManagementPageIcon , ExportIcon , PlusIcon , FilterIcon} from "assets/svg/icon";

import PageHeading from "components/shared-components/PageHeading/PageHeading";



import CategoryContent from "./CategoryContent";
import SubCategoryContent from "./SubCategoryContent";




const Category = () => {
  

  
  

  return (
    <React.Fragment>
      
      <PageHeading
        title="Inventory Management / Category"
        svg={InventoryManagementPageIcon}
      />

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Category",
            key: "1",
            children: <CategoryContent/>,
          },
          {
            label: "Sub-Category",
            key: "2",
            children: <SubCategoryContent/>,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default Category;
