import { Outlet } from '@tanstack/react-location';
import Header from './components/Header';
import ArtistProvider from './providers/ArtistProvider';
import SpotifyTokenProvider from './providers/SpotifyTokenProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DimensionsProvider from './providers/DimensionsProvider';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {

  return (
    <SpotifyTokenProvider>
      <ArtistProvider>
        <DimensionsProvider>
          <div className="App">
            <Header />
            <main className="main-content w-screen overflow-hidden">
              <Outlet />
            </main>
          </div>
        </DimensionsProvider>
      </ArtistProvider>
    </SpotifyTokenProvider>
  );
}

export default App;
