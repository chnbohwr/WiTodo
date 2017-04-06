import React, { Component, PropTypes } from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';
import { Link } from 'components/';
import './Sidebar.less';

export default class Sidebar extends Component {
  static propTypes = {
    menu: PropTypes.shape({}),
    updateActiveItems: PropTypes.func,
  }

  handleChange = ({activeItems}) => {
    this.props.updateActiveItems(activeItems);
  }

  render() {
    const { menu } = this.props;

    return (
      <Accordion allowMultiple activeItems={menu.activeItems} onChange={this.handleChange}>
        {
          menu.items.map(item =>
            <AccordionItem title={item.title} slug={item.id} key={item.id}>
              { item.children.map(child => <Link to={child.redirectUrl}>{child.title}</Link>) }
            </AccordionItem>
          )
        }
      </Accordion>
    );
  }
}
