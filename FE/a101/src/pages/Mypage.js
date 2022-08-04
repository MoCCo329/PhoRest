import ActivityTabs from "../components/MyPage/ActivityTabs";
import LayoutMypage from '../components/MyPage/LayoutMypage';
import MypageProfile from "../components/MyPage/MypageProfile";


export default function MyPage() {
  return (
    <LayoutMypage>
      <main>
        <div>
          <MypageProfile></MypageProfile>
        </div>
        <div>
          <ActivityTabs></ActivityTabs>
        </div>
      </main>
    </LayoutMypage>
  );
}
