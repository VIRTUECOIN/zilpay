import uuidv4 from 'uuid/v4'
import utils from '../../lib/utils'
import errors from '../../config/errors'


export class Message {
  
  constructor(msg) {
    if (typeof msg.type !== 'string') {
      throw new Error(errors.MESSAGE_TYPE_ERR);
    } else if (typeof msg.payload !== 'object') {
      throw new Error(errors.PAYLOAD_TYPE_ERR);
    }
    Object.keys(msg).forEach(key => this[key] = msg[key]);
  }

  static signal(type) {
    return new Message({
      type,
      payload: {}
    });
  }

  send() {
    return new Promise(resolve => {
      window.chrome
            .runtime
            .sendMessage(this, res => resolve(res));
    });
  }
}

export class SecureMessage extends Message {
  
  constructor(msg) {
    super(msg);
    
    if (!msg.domain) {
      this.domain = utils.strippedHost();
    }
    if (!msg.id) {
      this.id = uuidv4();
    }
  }

  send(stream, recipient) {
    return stream.send(this, recipient);
  }

}

export class TabsMessage extends Message {
  
  constructor(msg) {
    super(msg);
  }

  static tabs() {
    /**
     * @returns {Promise}:
     *  title
     *  url
     *  favIconUrl
     *  id
     */
    return new Promise(resolve => {
      chrome.windows.getAll({populate:true},function(windows){
        if (windows.length < 1) {
          throw new Error('Not active tabs');
        }

        resolve(
          windows[0].tabs.map(tab => tab.id)
        );
      });
    });
  }

  async send () {
    const self = this;

    try {
      const tabs = await TabsMessage.tabs();
      tabs.forEach(
        id => 
        window.chrome.tabs.sendMessage(id, self)
      );
    } catch(err) {
      // If not tabs with ZilPay.
    }
  }
}