#替代役男與他的快樂假期

部分役男在服役時會積一些榮譽假及補休，打算在最後退役前一次放完。但由於有不能連續十天沒上勤的規定，所以在排假時會有點小麻煩，因此寫了這個程式來輔助規劃休退假期。

<http://github.eddiewen.me/happy-vacation/>

線上版本: v1.4.1<br/>
~~沒新增功能只是偷玩一下 ES2015~~<br/>
修改記錄如 [Releases](https://github.com/EddieWen-Taiwan/happy-vacation/releases)

---

###使用條件：
使用條件是依照內政部移民署署本部的規定來設定，所以在此服役的役男可安心使用。若有於其他單位服役的役男需要使用，請先閱讀下述條件：

1. 知道自己哪天退伍。（可以用[阿替倒數中](http://smscount.lol)試算
2. 所屬役別週六日正常休假，不上勤。
3. 所屬役別需遵守「不能連續十天不上勤」的規定。

---

###使用說明：
![demo-image-1](/images/demo-image-1.png)

1. 首先輸入退伍日期，再來可以選擇第十天回來上勤時只要上半天還是上全天
	* 這影響到所需時數的計算，不過目前只能全部統一，不能這天要上整天那天又只上半天
2. 按下確認後會顯示第一次計算出來的結果，計算方式是從退伍日開始往前推十天，反覆九次，因此可以得到退伍近前三個月的休退計劃。計算都是以最大化、放到第十天再回來上勤為主，如果第十天遇到禮拜六日會往前到第八或第九天（禮拜一）上勤。
3. 得到第一次結果後，使用者仍然可以自行調整，將滑鼠移至上勤日區塊上會顯示左右箭頭便可針對該日上勤調整。不過仍以無法違反十日為原則。
4. 最後，可以任意點擊這三個月內的某日，系統會計算從這天開始休退的話（包含點擊該日）所需的時數。但這計算結果不包含退伍日當天，也就是退伍日當天不請假。

![demo-image-2](/images/demo-image-2.png)

---

###已加入的國定假日及週六補班：

事件 | 日期 | 事件 | 日期
----|----|----|----
新年 | 2016-02-08 ~ 2016-02-12 | 二二八補假 | 2016-02-29
清明節 | 2016-04-04 | 兒童節補假 | 2016-04-05
*06/10補班 | 2016-06-04 | 端午節 | 2016-06-09
彈性放假 | 2016-06-10 | *09/16補班 | 2016-09-10
中秋節 | 2016-09-15 | 彈性放假 | 2016-09-16
雙十節 | 2016-10-10 |    | 
元旦補假 | 2017-01-02 | 新年 | 2017-01-27 ~ 2017-02-01
彈性放假 | 2017-02-27 | 二二八 | 2017-02-28
彈性放假 | 2017-04-03 | 兒童節 | 2017-04-04
清明節 | 2017-04-05 | 彈性放假 | 2017-05-29
端午節 | 2017-05-30 | 彈性放假 | 2017-10-09
雙十節 | 2017-10-10
