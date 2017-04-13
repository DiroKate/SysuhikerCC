import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';

class Footer extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };

  static defaultProps = {
    className: 'footer1',
  };

  getLiChildren = (data, i) => {
    const links = data.contentLink.split(/\n/).filter(item => item);
    const content = data.content.split(/\n/).filter(item => item)
      .map((item, ii) => {
        const cItem = item.trim();
        const isImg = cItem.match(/\.(jpg|png|svg|bmp|jpeg)$/i);
        return (<li className={isImg ? 'icon' : ''} key={ii}>
          <a href={links[ii]} target="_blank">
            {isImg ? <img src={cItem} width="100%" /> : cItem}
          </a>
        </li>);
      });
    return (<li className={data.className} key={i} id={`${this.props.id}-block${i}`}>
      <h2>{data.title}</h2>
      <ul>
        {content}
      </ul>
    </li>);
  }

  render() {
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.isMode;
    const logoContent = { img: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg', content: '逸仙徒步，自由的AA户外组织' };
    const dataSource = [
      // { title: '产品', content: '产品更新记录\nAPI文档\n快速入门\n参考指南', contentLink: '#\n#\n#\n#' },
      { title: '', content: ' ', contentLink: ' ' },
      { title: '', content: ' ', contentLink: ' ' },
      { title: '关于', content: 'FAQ\n联系我们\n粤ICP备16111719号-2', contentLink: '#\n#\nhttp://www.miitbeian.gov.cn/' },
      { title: '关注', content: ' https://zos.alipayobjects.com/rmsportal/AXtqVjTullNabao.svg\n https://zos.alipayobjects.com/rmsportal/IDZTVybHbaKmoEA.svg\n https://zos.alipayobjects.com/rmsportal/fhJykUTtceAhYFz.svg', contentLink: 'https://github.com/DiroKate/SysuhikerCC\n http://weibo.com/yixiantubu \n#' },
    ];
    const liChildrenToRender = dataSource.map(this.getLiChildren);
    return (<OverPack
      {...props}
      playScale={isMode ? 0.5 : 0.2}
    >
      <QueueAnim type="bottom" component="ul" key="ul" leaveReverse id={`${props.id}-ul`}>
        <li key="logo" id={`${props.id}-logo`}>
          <p className="logo">
            <img src={logoContent.img} width="100%" />
          </p>
          <p>{logoContent.content}</p>
        </li>
        {liChildrenToRender}
      </QueueAnim>
      <TweenOne
        animation={{ y: '+=30', opacity: 0, type: 'from' }}
        key="copyright"
        className="copyright"
        id={`${props.id}-content`}
      >
        <span>
          Copyright © 2017 The Project by <a href="#">Sysuhiker</a>. All Rights Reserved
        </span>
      </TweenOne>
    </OverPack>);
  }
}

export default Footer;
