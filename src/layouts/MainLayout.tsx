import { ReactNode } from 'react';
import Header from "../layouts/Header";

interface MainLayoutProps {
  children?: ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}

export default MainLayout;