import React from 'react';
import { Row, Col } from 'antd';
import { LocalIcon } from '../../components';
import styles from './contact.less';

function ContectUs() {
  return (
    <div>
      <h1>联系我们</h1>
      <Row type="flex" gutter={16} className={styles.wrapper}>
        <Col xs={{ span: 24 }} sm={{ span: 16 }}>
          <h2>逸仙徒步社区基金</h2>
          <br />
          <p>逸仙徒步社区基金，属非营利及自愿性质，采用公开及透明的运作方式，来源于大家，服务于大家。</p>
          <br />
          <br />
          <li>基金目的：</li>
          来源于大家，服务于大家。
          <br />
          <br />

          <li>基金主要用途：</li>
          <p>1. 支付逸仙徒步活动平台网站的服务运维消费费用（首要）。</p>
          <p>2. 一些公共装备的采购，如公共药品/广告牌/纪念品等（在有结余的情况下）。</p>
          <p>3. 其他一些管委会议定通过的项目。</p>
          <br />
          <li>基金筹款途径：</li>
          <p>1. 众人捐款。</p>
          <p>2. 活动结余（比如说活动/腐败结束后，还剩几块钱，一个个退回去麻烦，可以直接捐给我们社区基金）。</p>
          <p>3. 实物义卖。</p>
          <p>4. 广告赞助（PS：据新浪云官方统计，咱平台过去30天有17万PV的访问量，欢迎各位老板来投放广告，广告费从优！）。</p>
          <img src="http://sysuhiker.cc/upload/maps/201604/wps3FC7.tmp.jpg14601800898351.jpg" alt="" />
          <br />

          <li>大家对社区基金的权利：</li>
          <p>1.有权查阅任何一期财务报表。</p>
          <p>2.如对基金收付有疑义，有权提出并获解答。</p>
          <p>3.有权拒绝将本驴本次活动余款上交基金。</p>
          <p>4.有权提出基金所涵括用途的任何一项费用申请，但须服从动用程序产生的结果。</p>
          <p>5.有权对基金正常动用的结果提出自己的看法和建议， 但不影响管委会对该次动用的判断结果。</p>
          <p>6.有权对基金紧急动用的结果提出自己的看法和建议，但不影响管委会对该次动用的判断结果。</p>
          <br />

          <li>大家对社区基金的义务：</li>
          <p>1.对已上交的款项，默认接受管委会的一切管理和决策。</p>
          <p>2.对已上交的款项，不论是活动余款还是自愿捐款，不管对基金的运作有何想法，不得退还。</p>
          <p>3.对已上交款项，有义务在基金管理帖中发帖申明款项来源及金额。</p>

          <br />

          <li>社区基金管委会成员</li>
          <p>由逸仙徒步管委会管理。</p>

          <br />

          <p>管理组：later，北水，蛋神，柚子，小强，光子</p>

          <p>赞助联系人：蛋神</p>

          <p>财务：北水</p>

        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
          <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="QQqun" />26940421</p>
          <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="guanwang" /><a href="http://sysuhiker.cc">http://sysuhiker.cc</a></p>
          <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="weibo" /><a href="http://weibo.com/yixiantubu">@逸仙徒步</a></p>
          <p className={styles.contact}><LocalIcon className={styles.contactIcon} type="zhifubao" />sysu_hiker@126.com</p>
          <img
            src="http://sysuhiker.cc/upload/maps/201604/wps3FE7.tmp.png14601800911141.png"
            alt=""
          />
        </Col>
      </Row>
    </div>
  );
}
export default ContectUs;
