import React, { Component, PropTypes } from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';
import './Sidebar.less';

export default class Sidebar extends Component {
  static propTypes = {
    menu: PropTypes.shape({}),
    updateActiveItems: PropTypes.func,
    redirect: PropTypes.func,
  }

  handleChange = ({activeItems}) => {
    this.props.updateActiveItems(activeItems);
  }

  render() {
    const { menu, redirect } = this.props;

    return (
      <Accordion allowMultiple activeItems={menu.activeItems} onChange={this.handleChange}>
        {
          menu.items.map(item =>
            <AccordionItem title={item.title} slug={item.id} key={item.id}>
              { item.children.map((child, idx) => <button className="react-sanfona-item-body-wrapper-subMenu" onClick={() => redirect(child.redirectUrl)} key={`menu-${item.id}-${idx}`}>{child.title}</button>) }
            </AccordionItem>
          )
        }
      </Accordion>
    );
  }
}
