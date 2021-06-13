import React, { Component } from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import './comLabRRSS.scss';

const config = [
  {
    name: 'facebook',
    icon: 'icon-fb',
    url: 'http://www.facebook.com/sharer/sharer.php?u='
  },
  {
    name: 'twitter',
    icon: 'icon-twitter',
    url: 'https://twitter.com/intent/tweet?url='
  },
  {
    name: 'whatsapp',
    icon: 'icon-whatsup',
    url: 'https://web.whatsapp.com/send?text=',
    urlMobile: 'whatsapp://send?text='
  }
];

const styles = {
  horizontal: {
    flexDirection: 'row'
  },
  vertical: {
    flexDirection: 'column'
  }
};

export default class ComLabRRSS extends Component {
  get direction() {
    return !this.props.horizontal ? styles.vertical : styles.horizontal;
  }

  constructor(props) {
    super(props);

    this.state = {
      openShare: this.props.expanded,
      opened: false,
      isMobile: false
    };

    this.openPopUp = this.openPopUp.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getShareTwText = this.getShareTwText.bind(this);
    this.getShareWuText = this.getShareWuText.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
    this.getDefinition = this.getDefinition.bind(this);
    this.window = null;
  }

  componentDidMount() {
    this.window = window;
  }

  getShareTwText() {
    var str = browserHistory.getCurrentLocation().pathname;
    var res = str.split('/');
    let shareTwText = '';
    if (this.props.metadata['/' + res[res.length - 2] + '/']) {
      shareTwText = this.props.metadata[
        '/' + res[res.length - 2] + '/'
      ].twitterText;
    } else {
      shareTwText = this.props.metadata['/'].twitterText;;
    }
    return shareTwText;
  }

  getShareWuText() {
    var str = browserHistory.getCurrentLocation().pathname;
    var res = str.split('/');
    let shareWuText = '';
    if (this.props.metadata['/' + res[res.length - 2] + '/']) {
      this.props.metadata['/' + res[res.length - 2] + '/'].meta.map((metaValue, key) => {
        if(metaValue.property === 'og:description'){
          shareWuText = metaValue.content;
        }
      });
    } else {
      this.props.metadata['/'].meta.map((metaValue, key) => {
        if(metaValue.property === 'og:description'){
          shareWuText = metaValue.content;
        }
      });
    }
    return shareWuText;
  }

  getDefinition(element){
    let result;
    config.map((item) => {
      if(item.name === element){
        result = item;
      }
    });
    return result;
  }

  openPopUp(e) {
    
    let url = '';
    let element;
    if(e.target.children[0]){
			element = e.target.children[0].value;		
		}else{
			element = e.target.value;
		}
    let textTwShare = '';
    let urlShare = '';

    let customWidth = 560;
    let customHeight = 400;

    const defs = this.getDefinition(element);

    switch (element) {
      case 'twitter':
        textTwShare = this.getShareTwText(); // TODO: Este código levanta desde el header un mensaje para compatir !== '' ? data.text : this.getShareTwText('twitter');
        urlShare = defs.shareUrl || (this.window && this.window.location.href);
        url = `${defs.url}${urlShare}&text=${textTwShare}`;
        break;
      case 'whatsapp':
        textTwShare = this.getShareWuText(); 
        urlShare = defs.shareUrl || (this.window && this.window.location.href);
        url = this.state.isMobile
          ? `${defs.urlMobile}${textTwShare} ${urlShare}`
          : `${defs.url}${textTwShare} ${urlShare}`;
        break;
      case 'facebook':
        urlShare = defs.shareUrl || (this.window && this.window.location.href);
        url = `${defs.url}${urlShare}`;
        customWidth = 820;
        customHeight = 580;
        break;
      default:
        break;
    }

    urlShare = encodeURIComponent(urlShare);

    this.props.analytics ? Analytics.adobeShare() : false;
    this.window &&
      this.window.open(
        url,
        '_blank',
        'toolbar=no, scrollbars=no, resizable=yes, top=500, left=500, width=' +
          customWidth +
          ', height=' +
          customHeight
      );
  }

  toggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  toggleShare() {
    this.setState({ openShare: !this.state.openShare });
  }

  addShareIcon() {
    return this.props.expanded ? null : (
      <p className='rrssContainer__iconOpen' onClick={this.toggleShare}>
        <i className='icon-share' />
      </p>
    );
  }

  render() {

    if(this.props.isMobile && this.props.isMobile != this.state.isMobile){
      this.setState({
        isMobile: this.props.isMobile
      });
    };

    const classElem = classNames({
      rrssContainer__iconList__elem: true,
      rrssContainer__iconList__elemMobile: this.state.isMobile
    });

    const parentClass = classNames({
      open: this.state.openShare,
      close: !this.state.openShare,
      rrssContainer: true,
      rrssContainer__defaultStyle: true
    });

    return (
      <div className={parentClass}>
        {this.addShareIcon()}

        <ul className='rrssContainer__iconList' style={this.direction}>
          {config.map((item, i) => {
            return (
              <li
                key={`rrss-${item.name}`}
                onClick={e => this.openPopUp(e)}
                className={classElem}
              >
                <button
                  value={item.name}
                  className={`rrssContainer__iconList__elem__icon icon ${
                    item.icon
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
