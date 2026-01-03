import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
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
  { id: 1, title: 'На заре', artist: 'Альянс', album: 'Лучшее', duration: '3:42', coverUrl: 'https://via.placeholder.com/300x300/FF3B30/FFFFFF?text=1' },
  { id: 2, title: 'Группа крови', artist: 'Кино', album: 'Группа крови', duration: '4:48', coverUrl: 'https://via.placeholder.com/300x300/FF9500/FFFFFF?text=2' },
  { id: 3, title: 'Звезда по имени Солнце', artist: 'Кино', album: 'Звезда по имени Солнце', duration: '3:45', coverUrl: 'https://via.placeholder.com/300x300/FFCC00/000000?text=3' },
  { id: 4, title: 'Виктор', artist: 'Цой', album: 'Последний герой', duration: '5:12', coverUrl: 'https://via.placeholder.com/300x300/34C759/FFFFFF?text=4' },
  { id: 5, title: 'Перемен', artist: 'Кино', album: 'Звезда по имени Солнце', duration: '4:56', coverUrl: 'https://via.placeholder.com/300x300/007AFF/FFFFFF?text=5' },
];

const mockPlaylists: Playlist[] = [
  { id: 1, title: 'Плейлист дня', description: 'Персональная подборка', coverUrl: 'https://via.placeholder.com/300x300/FF3B30/FFFFFF?text=Daily', trackCount: 50 },
  { id: 2, title: 'Русский рок', description: 'Классика рока', coverUrl: 'https://via.placeholder.com/300x300/FF9500/FFFFFF?text=Rock', trackCount: 120 },
  { id: 3, title: 'Дежавю', description: 'Любимые хиты', coverUrl: 'https://via.placeholder.com/300x300/FFCC00/000000?text=Hits', trackCount: 80 },
  { id: 4, title: 'В дороге', description: 'Для путешествий', coverUrl: 'https://via.placeholder.com/300x300/34C759/FFFFFF?text=Road', trackCount: 65 },
];

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  const filteredTracks = searchQuery
    ? mockTracks.filter(
        track =>
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockTracks;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-y-auto pb-40">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <div className="px-6 pt-16 pb-8">
              <h1 className="text-5xl font-bold mb-2">Музыка</h1>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 px-6">Плейлисты</h2>
              <div className="px-6 grid grid-cols-2 gap-4">
                {mockPlaylists.map(playlist => (
                  <div
                    key={playlist.id}
                    className="cursor-pointer group"
                  >
                    <div className="relative mb-3">
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.title}
                        className="w-full aspect-square rounded-lg object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg" />
                    </div>
                    <h3 className="font-semibold text-base mb-0.5">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground">{playlist.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-6">
              <h2 className="text-2xl font-bold mb-4">Недавние</h2>
              <div className="space-y-1">
                {mockTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => {
                      setCurrentTrack(track);
                      setIsPlaying(true);
                      setShowPlayer(true);
                    }}
                    className={cn(
                      'flex items-center gap-3 p-2 rounded-lg active:bg-secondary/30 cursor-pointer',
                      currentTrack.id === track.id && isPlaying && 'bg-secondary/20'
                    )}
                  >
                    <img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        'font-medium truncate',
                        currentTrack.id === track.id && isPlaying && 'text-primary'
                      )}>{track.title}</div>
                      <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                    </div>
                    {currentTrack.id === track.id && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-4 mr-2">
                        <div className="w-0.5 bg-primary animate-pulse" style={{ height: '40%', animation: 'pulse 0.8s ease-in-out infinite' }} />
                        <div className="w-0.5 bg-primary animate-pulse" style={{ height: '100%', animation: 'pulse 0.8s ease-in-out 0.2s infinite' }} />
                        <div className="w-0.5 bg-primary animate-pulse" style={{ height: '60%', animation: 'pulse 0.8s ease-in-out 0.4s infinite' }} />
                      </div>
                    ) : (
                      <button className="p-2">
                        <Icon name="MoreHorizontal" size={20} className="text-muted-foreground" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="animate-fade-in">
            <div className="px-6 pt-16 pb-6">
              <h1 className="text-5xl font-bold mb-6">Поиск</h1>

              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Исполнители, песни..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-secondary border-none rounded-xl text-base"
                />
              </div>
            </div>

            {searchQuery ? (
              <div className="px-6">
                <h2 className="text-xl font-bold mb-4">Результаты</h2>
                <div className="space-y-1">
                  {filteredTracks.length > 0 ? (
                    filteredTracks.map((track) => (
                      <div
                        key={track.id}
                        onClick={() => {
                          setCurrentTrack(track);
                          setIsPlaying(true);
                          setShowPlayer(true);
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg active:bg-secondary/30 cursor-pointer"
                      >
                        <img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{track.title}</div>
                          <div className="text-sm text-muted-foreground truncate">{track.artist} • {track.album}</div>
                        </div>
                        <button className="p-2">
                          <Icon name="MoreHorizontal" size={20} className="text-muted-foreground" />
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
              </div>
            ) : (
              <div className="px-6">
                <h2 className="text-xl font-bold mb-4">Популярные жанры</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['Поп-музыка', 'Рок', 'Хип-хоп', 'Электроника', 'Классика', 'Джаз'].map((genre) => (
                    <div
                      key={genre}
                      className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 h-24 flex items-end cursor-pointer active:scale-95 transition-transform"
                    >
                      <span className="font-bold text-lg">{genre}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="animate-fade-in">
            <div className="px-6 pt-16 pb-8">
              <h1 className="text-5xl font-bold mb-2">Медиатека</h1>
            </div>

            <div className="px-6 space-y-3">
              <div className="flex items-center gap-4 py-3 cursor-pointer active:opacity-70">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={28} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">Любимые треки</div>
                  <div className="text-sm text-muted-foreground">125 треков</div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>

              <div className="flex items-center gap-4 py-3 cursor-pointer active:opacity-70">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={28} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">История</div>
                  <div className="text-sm text-muted-foreground">Недавно прослушанные</div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>

              <div className="flex items-center gap-4 py-3 cursor-pointer active:opacity-70">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Icon name="ListMusic" size={28} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">Плейлисты</div>
                  <div className="text-sm text-muted-foreground">8 плейлистов</div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>

              <div className="flex items-center gap-4 py-3 cursor-pointer active:opacity-70">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Icon name="Disc" size={28} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">Альбомы</div>
                  <div className="text-sm text-muted-foreground">42 альбома</div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>

      {showPlayer && (
        <div
          onClick={() => setShowPlayer(false)}
          className="fixed bottom-20 left-0 right-0 mx-auto max-w-md px-4 cursor-pointer"
        >
          <div className="bg-card rounded-2xl p-3 shadow-2xl backdrop-blur-xl bg-opacity-90 flex items-center gap-3">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-14 h-14 rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{currentTrack.title}</div>
              <div className="text-sm text-muted-foreground truncate">{currentTrack.artist}</div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="w-11 h-11 rounded-full bg-primary flex items-center justify-center active:scale-90 transition-transform"
            >
              <Icon
                name={isPlaying ? 'Pause' : 'Play'}
                size={22}
                className="text-primary-foreground"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-11 h-11 rounded-full flex items-center justify-center"
            >
              <Icon name="SkipForward" size={22} className="text-foreground" />
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-card/95 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around h-20 px-6">
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center gap-1 transition-colors active:scale-90"
          >
            <Icon
              name="Home"
              size={26}
              className={cn(
                'transition-colors',
                activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <span
              className={cn(
                'text-xs font-medium',
                activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Главная
            </span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className="flex flex-col items-center gap-1 transition-colors active:scale-90"
          >
            <Icon
              name="Search"
              size={26}
              className={cn(
                'transition-colors',
                activeTab === 'search' ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <span
              className={cn(
                'text-xs font-medium',
                activeTab === 'search' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Поиск
            </span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className="flex flex-col items-center gap-1 transition-colors active:scale-90"
          >
            <Icon
              name="Library"
              size={26}
              className={cn(
                'transition-colors',
                activeTab === 'library' ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <span
              className={cn(
                'text-xs font-medium',
                activeTab === 'library' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Медиатека
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
