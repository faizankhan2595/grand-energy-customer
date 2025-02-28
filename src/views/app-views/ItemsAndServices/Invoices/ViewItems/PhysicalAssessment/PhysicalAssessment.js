import React, { useState } from "react";

import { Steps } from "antd";
import Icon from "@ant-design/icons";

import "./PhysicalAssessment.css";

import {
  ItemsGreenIcon,
  InspectionIcon,
  ServiceIcon,
  ImageIcon,
  PreviewIcon,
  InspectionGreenIcon,
  ServiceGreenIcon,
  ImagesGreenIcon,
  PreviewGreenIcon,
} from "views/app-views/ItemsAndServices/svgIcons";
import PageHeading from "components/shared-components/PageHeading/PageHeading";
import { ItemsAndServicesPageIcon } from "assets/svg/icon";
import Item from "./Item";
import Inspection from "./Inspection";
import Services from "./Services";
import Images from "./Images";
import Drawer from 'react-modern-drawer'
import ServiceTagsDrawer from "./ServiceTagsDrawer";
import Preview from "./Preview";

import classes from './Preview.module.css'

const PhysicalAssessment = () => {
  const [current, setCurrent] = useState(0);

  const [drawerIsOpen , setDrawerIsOpen] = useState(false);

  const drawerHandler = () => {
    setDrawerIsOpen(prev => !prev);
  }

  const next = () => {
    if (current + 1 < 5) setCurrent((prev) => prev + 1);
  };

  const prev = () => {
    if (current == 0) return;
    setCurrent((prev) => prev - 1);
  };

  const pages = [
    <Item next={next} prev={prev} />,
    <Inspection next={next} prev={prev} />,
    <Services next={next} prev={prev} />,
    <Images drawerHandler={drawerHandler} prev={prev} />,
    <Preview/>
  ];
  return (
    <React.Fragment>
      <Drawer
        open={drawerIsOpen}
        onClose={drawerHandler}
        direction="right"
        zIndex={1000}
        size={550}
        className={`${classes.drawer}`}
      >
        <ServiceTagsDrawer onClose={drawerHandler} next={next}/>
      </Drawer>
      <PageHeading
        title="Items & Services / Invoices / Pickup Items / Item Physical Assessment"
        svg={ItemsAndServicesPageIcon}
      />
      <div className="physical_assessment_nav">
        <Steps
          labelPlacement="vertical"
          current={current}
          items={[
            {
              title: "Item",
              status: "wait",
              icon: <Icon component={ItemsGreenIcon}></Icon>,
            },
            {
              title: "Inspection",
              status: "wait",
              icon: (
                <Icon
                  component={
                    current >= 1 ? InspectionGreenIcon : InspectionIcon
                  }
                ></Icon>
              ),
            },
            {
              title: "Services",
              status: "wait",
              icon: (
                <Icon
                  component={current >= 2 ? ServiceGreenIcon : ServiceIcon}
                ></Icon>
              ),
            },
            {
              title: "Images",
              status: "wait",
              icon: (
                <Icon
                  component={current >= 3 ? ImagesGreenIcon : ImageIcon}
                ></Icon>
              ),
            },
            {
              title: "Preview",
              status: "wait",
              icon: (
                <Icon
                  component={current >= 4 ? PreviewGreenIcon : PreviewIcon}
                ></Icon>
              ),
            },
          ]}
        />
      </div>

      {pages[current]}
    </React.Fragment>
  );
};

export default PhysicalAssessment;
