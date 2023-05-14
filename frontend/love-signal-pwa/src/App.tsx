import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/pages/Main/Main";
import SignUp from "./components/pages/SignUp/SignUp";
import Manual from "./components/Manual/Manual";
import ExploreTeam from "./components/pages/OtherGender/ExploreTeam";
import FindTeam from "./components/pages/FindTeam/FindTeam";
import TeamBuild from "./components/pages/TeamBuild/TeamBuild";
import MyTeam from "./components/pages/MyTeam/MyTeam";
import Mypage from "./components/pages/Mypage/Mypage";
import RootLayout from "./components/pages/Common/RootLayout";
import Chat from "./components/pages/Chat/Chat";
import NotFound from "./components/pages/Common/NotFound";
import ContentLayout from "./components/pages/Common/ContentLayout";
import { AnimatePresence } from "framer-motion";
import MatchTeam from "./components/templates/FindTeam/MatchTeam";
import Test from "./components/pages/Test";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { firebaseApp, firebaseMessaging } from "./atom/fcm";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Messaging, getMessaging } from "firebase/messaging";

function App() {
  const [_, setFirebaseApp] = useRecoilState<FirebaseApp>(firebaseApp);
  const [__, setFirebaseMessaging] =
    useRecoilState<Messaging>(firebaseMessaging);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_PUSH_VAPID,
      authDomain: process.env.REACT_APP_PUSH_DOMAIN,
      projectId: process.env.REACT_APP_PUSH_PROJECT_ID,
      storageBucket: process.env.REACT_APP_PUSH_PROCESS_BUCKET,
      messagingSenderId: process.env.REACT_APP_PUSH_SENDER_ID,
      appId: process.env.REACT_APP_PUSH_APP_ID,
      measurementId: process.env.REACT_APP_PUSH_MEASUREMENT,
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    setFirebaseApp(app);
    setFirebaseMessaging(messaging);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Main /> },
        {
          path: "/Signup",
          element: <SignUp />,
        },
        {
          path: "/Manual",
          element: <Manual />,
        },
        {
          path: "/Test",
          element: <Test />,
        },
        {
          path: "/",
          element: <ContentLayout />,
          children: [
            {
              path: "/OtherGender",
              element: <ExploreTeam />,
            },
            {
              path: "/SameGender",
              element: <FindTeam />,
            },
            {
              path: "/SameGender/Build",
              element: <TeamBuild />,
            },
            {
              path: "/SameGender/MyTeam",
              element: <MyTeam />,
            },
            {
              path: "/SameGender/Match",
              element: <MatchTeam />,
            },
            {
              path: "/Chat",
              element: <Chat />,
            },
            {
              path: "/Mypage",
              element: <Mypage />,
            },
          ],
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <AnimatePresence>
      <RouterProvider router={router} />;
    </AnimatePresence>
  );
}

export default App;
