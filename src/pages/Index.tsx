import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
}

interface Playlist {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  trackCount: number;
}

const mockTracks: Track[] = [
  { id: 1, title: 'На заре', artist: 'Альянс', album: 'Лучшее', duration: '3:42', coverUrl: 'https://via.placeholder.com/300x300/FFDB4D/000000?text=1' },
  { id: 2, title: 'Группа крови', artist: 'Кино', album: 'Группа крови', duration: '4:48', coverUrl: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=2' },
  { id: 3, title: 'Звезда по имени Солнце', artist: 'Кино', album: 'Звезда по имени Солнце', duration: '3:45', coverUrl: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=3' },
  { id: 4, title: 'Виктор', artist: 'Цой', album: 'Последний герой', duration: '5:12', coverUrl: 'https://via.placeholder.com/300x300/95E1D3/000000?text=4' },
  { id: 5, title: 'Перемен', artist: 'Кино', album: 'Звезда по имени Солнце', duration: '4:56', coverUrl: 'https://via.placeholder.com/300x300/F38181/FFFFFF?text=5' },
];

const mockPlaylists: Playlist[] = [
  { id: 1, title: 'Плейлист дня', description: 'Персональная подборка треков', coverUrl: 'https://via.placeholder.com/300x300/FFDB4D/000000?text=Daily', trackCount: 50 },
  { id: 2, title: 'Русский рок', description: 'Классика отечественного рока', coverUrl: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Rock', trackCount: 120 },
  { id: 3, title: 'Дежавю', description: 'Хиты, которые вы любили', coverUrl: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Hits', trackCount: 80 },
  { id: 4, title: 'В дороге', description: 'Музыка для путешествий', coverUrl: 'https://via.placeholder.com/300x300/95E1D3/000000?text=Road', trackCount: 65 },
];

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState([75]);

  const filteredTracks = searchQuery
    ? mockTracks.filter(
        track =>
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockTracks;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-card border-r border-border p-4 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Music" size={24} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Музыка</span>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                activeTab === 'home' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <Icon name="Home" size={20} />
              <span className="font-medium">Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                activeTab === 'search' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <Icon name="Search" size={20} />
              <span className="font-medium">Поиск</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                activeTab === 'library' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <Icon name="Library" size={20} />
              <span className="font-medium">Моя музыка</span>
            </button>
          </nav>

          <div className="mt-auto pt-6 border-t border-border">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Icon name="User" size={20} />
              <div>
                <div className="font-medium text-foreground">Пользователь</div>
                <div className="text-xs">Подписка Plus</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto pb-32">
          {activeTab === 'home' && (
            <div className="p-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-8">Главная</h1>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Плейлисты для вас</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {mockPlaylists.map(playlist => (
                    <div
                      key={playlist.id}
                      className="bg-card rounded-lg p-3 hover:bg-secondary/50 transition-all cursor-pointer hover-scale group"
                    >
                      <div className="relative mb-3">
                        <img
                          src={playlist.coverUrl}
                          alt={playlist.title}
                          className="w-full aspect-square rounded-md object-cover"
                        />
                        <button className="absolute bottom-2 right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform">
                          <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
                        </button>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{playlist.title}</h3>
                      <p className="text-sm text-muted-foreground">{playlist.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{playlist.trackCount} треков</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Популярные треки</h2>
                <div className="bg-card rounded-xl p-4">
                  {mockTracks.map((track, index) => (
                    <div
                      key={track.id}
                      onClick={() => {
                        setCurrentTrack(track);
                        setIsPlaying(true);
                      }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
                    >
                      <span className="w-8 text-center">
                        {currentTrack.id === track.id && isPlaying ? (
                          <div className="flex items-end gap-0.5 h-4 justify-center">
                            <div className="w-0.5 bg-primary animate-pulse" style={{ height: '40%', animation: 'pulse 0.8s ease-in-out infinite' }} />
                            <div className="w-0.5 bg-primary animate-pulse" style={{ height: '100%', animation: 'pulse 0.8s ease-in-out 0.2s infinite' }} />
                            <div className="w-0.5 bg-primary animate-pulse" style={{ height: '60%', animation: 'pulse 0.8s ease-in-out 0.4s infinite' }} />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">{index + 1}</span>
                        )}
                      </span>
                      <img src={track.coverUrl} alt={track.title} className="w-12 h-12 rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{track.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                      </div>
                      <div className="text-sm text-muted-foreground hidden md:block">{track.album}</div>
                      <div className="text-sm text-muted-foreground">{track.duration}</div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="Heart" size={20} className="text-muted-foreground hover:text-primary" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="p-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-8">Поиск</h1>

              <div className="mb-8 max-w-2xl">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Исполнители, треки или альбомы"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-card border-border"
                  />
                </div>
              </div>

              {searchQuery && (
                <div className="bg-card rounded-xl p-4">
                  <h2 className="text-xl font-bold mb-4">Результаты поиска</h2>
                  {filteredTracks.length > 0 ? (
                    filteredTracks.map((track, index) => (
                      <div
                        key={track.id}
                        onClick={() => {
                          setCurrentTrack(track);
                          setIsPlaying(true);
                        }}
                        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group ${
                          currentTrack.id === track.id && isPlaying ? 'bg-secondary/70' : ''
                        }`}
                      >
                        <div className="w-8 flex items-center justify-center">
                          {currentTrack.id === track.id && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-4">
                              <div className="w-0.5 bg-primary animate-pulse" style={{ height: '40%', animation: 'pulse 0.8s ease-in-out infinite' }} />
                              <div className="w-0.5 bg-primary animate-pulse" style={{ height: '100%', animation: 'pulse 0.8s ease-in-out 0.2s infinite' }} />
                              <div className="w-0.5 bg-primary animate-pulse" style={{ height: '60%', animation: 'pulse 0.8s ease-in-out 0.4s infinite' }} />
                            </div>
                          ) : null}
                        </div>
                        <img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate text-lg">{track.title}</div>
                          <div className="text-sm text-muted-foreground truncate">{track.artist} • {track.album}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{track.duration}</div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="Heart" size={20} className="text-muted-foreground hover:text-primary" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Ничего не найдено</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'library' && (
            <div className="p-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-8">Моя музыка</h1>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl p-6 aspect-square flex flex-col justify-end cursor-pointer hover-scale">
                  <Icon name="Heart" size={32} className="mb-2" />
                  <h3 className="text-xl font-bold">Любимые треки</h3>
                  <p className="text-sm opacity-80">125 треков</p>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl p-6 aspect-square flex flex-col justify-end cursor-pointer hover-scale">
                  <Icon name="Clock" size={32} className="mb-2" />
                  <h3 className="text-xl font-bold">История</h3>
                  <p className="text-sm opacity-80">Недавно</p>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-900 rounded-xl p-6 aspect-square flex flex-col justify-end cursor-pointer hover-scale">
                  <Icon name="ListMusic" size={32} className="mb-2" />
                  <h3 className="text-xl font-bold">Плейлисты</h3>
                  <p className="text-sm opacity-80">8 плейлистов</p>
                </div>

                <div className="bg-gradient-to-br from-orange-600 to-orange-900 rounded-xl p-6 aspect-square flex flex-col justify-end cursor-pointer hover-scale">
                  <Icon name="Disc" size={32} className="mb-2" />
                  <h3 className="text-xl font-bold">Альбомы</h3>
                  <p className="text-sm opacity-80">42 альбома</p>
                </div>
              </div>

              <section>
                <h2 className="text-2xl font-bold mb-6">Недавно прослушано</h2>
                <div className="bg-card rounded-xl p-4">
                  {mockTracks.slice(0, 5).map((track) => (
                    <div
                      key={track.id}
                      onClick={() => {
                        setCurrentTrack(track);
                        setIsPlaying(true);
                      }}
                      className={`flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group ${
                        currentTrack.id === track.id && isPlaying ? 'bg-secondary/70' : ''
                      }`}
                    >
                      <div className="w-8 flex items-center justify-center">
                        {currentTrack.id === track.id && isPlaying ? (
                          <div className="flex items-end gap-0.5 h-4">
                            <div className="w-0.5 bg-primary animate-pulse" style={{ height: '40%', animation: 'pulse 0.8s ease-in-out infinite' }} />
                            <div className="w-0.5 bg-primary animate-pulse" style={{ height: '100%', animation: 'pulse 0.8s ease-in-out 0.2s infinite' }} />
                            <div className="w-0.5 bg-primary animate-pulse" style={{ height: '60%', animation: 'pulse 0.8s ease-in-out 0.4s infinite' }} />
                          </div>
                        ) : null}
                      </div>
                      <img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-lg">{track.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{track.duration}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-14 h-14 rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{currentTrack.title}</div>
              <div className="text-sm text-muted-foreground truncate">{currentTrack.artist}</div>
            </div>

            <button className="hover:text-primary transition-colors">
              <Icon name="Heart" size={20} />
            </button>

            <div className="flex items-center gap-4">
              <button className="hover:text-primary transition-colors">
                <Icon name="Shuffle" size={20} />
              </button>
              <button className="hover:text-primary transition-colors">
                <Icon name="SkipBack" size={24} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Icon
                  name={isPlaying ? 'Pause' : 'Play'}
                  size={24}
                  className="text-primary-foreground"
                />
              </button>
              <button className="hover:text-primary transition-colors">
                <Icon name="SkipForward" size={24} />
              </button>
              <button className="hover:text-primary transition-colors">
                <Icon name="Repeat" size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3 w-40">
              <Icon name="Volume2" size={20} className="text-muted-foreground" />
              <div className="flex items-end gap-1 h-5">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <div
                    key={bar}
                    className="w-1 bg-primary rounded-full transition-all"
                    style={{
                      height: volume[0] >= bar * 20 ? `${bar * 20}%` : '20%',
                      opacity: volume[0] >= bar * 20 ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-12 text-right">0:00</span>
            <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: isPlaying ? '35%' : '0%' }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-12">{currentTrack.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;