import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Sparkles, Music2, Disc3, Headphones, Mic2, Globe2, Waves, Zap, Film, Coffee, Heart, Podcast, Music, Volume2, Speaker } from 'lucide-react';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';
import { SearchBar } from '@/components/SearchBar';
import { RegionTabs } from '@/components/RegionTabs';
import { StationGrid } from '@/components/StationGrid';
import { REGIONS } from '@/types/radio';
import { usePlayer } from '@/contexts/PlayerContext';
import { RadioStation } from '@/types/radio';

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState('india');
  const [showAllEditorsPicks, setShowAllEditorsPicks] = useState(false);
  const [showAllNotable, setShowAllNotable] = useState(false);
  const region = REGIONS.find(r => r.id === selectedRegion);
  const { play, currentStation, isPlaying } = usePlayer();

  // Station icons mapping
  const stationIcons: Record<string, any> = {
    'kexp': Radio,
    'nts': Disc3,
    'worldwide': Globe2,
    'dublab': Waves,
    'fip': Music2,
    'tsfjazz': Music,
    'balamii': Zap,
    'netil': Headphones,
    'soho': Mic2,
    'cinemix': Film,
    'boxout': Speaker,
    'indiegini': Music2,
    'air-rainbow': Radio,
    'radiocity': Podcast,
    'kuoi': Headphones,
    'kdvs': Disc3,
    'kzsc': Music2,
    'kvsc': Radio,
    'wmnf': Mic2,
    'kfai': Globe2,
    'wncw': Music,
    'wyep': Waves,
    'wfmu': Zap,
    'kcrw': Podcast,
    'thelot': Speaker,
    'radiooooo': Globe2,
    'refuge': Waves,
    'oroko': Heart,
    'kutx': Music2,
  };

  // Editor's Picks - Real stations (10 stations)
  const editorsPicks: RadioStation[] = [
    {
      id: 'kexp',
      stationuuid: 'kexp-seattle',
      name: 'KEXP',
      url: 'https://kexp-mp3-128.streamguys1.com/kexp128.mp3',
      url_resolved: 'https://kexp-mp3-128.streamguys1.com/kexp128.mp3',
      favicon: 'https://www.kexp.org/apple-touch-icon.png',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'indie,alternative,rock',
      votes: 5000,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://www.kexp.org',
    },
    {
      id: 'nts',
      stationuuid: 'nts-london',
      name: 'NTS Radio',
      url: 'https://stream-relay-geo.ntslive.net/stream',
      url_resolved: 'https://stream-relay-geo.ntslive.net/stream',
      favicon: 'https://www.nts.live/favicon.ico',
      country: 'UK',
      countrycode: 'GB',
      language: 'english',
      tags: 'alternative,electronic,eclectic',
      votes: 4500,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://www.nts.live',
    },
    {
      id: 'worldwide',
      stationuuid: 'worldwide-fm',
      name: 'Worldwide FM',
      url: 'https://worldwidefm.out.airtime.pro/worldwidefm_a',
      url_resolved: 'https://worldwidefm.out.airtime.pro/worldwidefm_a',
      favicon: 'https://worldwidefm.net/favicon.ico',
      country: 'UK',
      countrycode: 'GB',
      language: 'english',
      tags: 'eclectic,world,electronic',
      votes: 4000,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://worldwidefm.net',
    },
    {
      id: 'dublab',
      stationuuid: 'dublab-la',
      name: 'dublab',
      url: 'https://dublab.out.airtime.pro/dublab_a',
      url_resolved: 'https://dublab.out.airtime.pro/dublab_a',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'electronic,experimental,eclectic',
      votes: 3800,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://dublab.com',
    },
    {
      id: 'fip',
      stationuuid: 'fip-france',
      name: 'FIP',
      url: 'https://icecast.radiofrance.fr/fip-midfi.mp3',
      url_resolved: 'https://icecast.radiofrance.fr/fip-midfi.mp3',
      favicon: '',
      country: 'France',
      countrycode: 'FR',
      language: 'french',
      tags: 'eclectic,jazz,world',
      votes: 4200,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://www.fip.fr',
    },
    {
      id: 'tsfjazz',
      stationuuid: 'tsf-jazz',
      name: 'TSF JAZZ',
      url: 'https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3',
      url_resolved: 'https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3',
      favicon: '',
      country: 'France',
      countrycode: 'FR',
      language: 'french',
      tags: 'jazz,smooth',
      votes: 3600,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://www.tsfjazz.com',
    },
    {
      id: 'balamii',
      stationuuid: 'balamii-london',
      name: 'Balamii',
      url: 'https://balamii.out.airtime.pro/balamii_a',
      url_resolved: 'https://balamii.out.airtime.pro/balamii_a',
      favicon: '',
      country: 'UK',
      countrycode: 'GB',
      language: 'english',
      tags: 'electronic,underground,eclectic',
      votes: 3400,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://balamii.com',
    },
    {
      id: 'netil',
      stationuuid: 'netil-radio',
      name: 'Netil Radio',
      url: 'https://netilradio.out.airtime.pro/netilradio_a',
      url_resolved: 'https://netilradio.out.airtime.pro/netilradio_a',
      favicon: '',
      country: 'UK',
      countrycode: 'GB',
      language: 'english',
      tags: 'electronic,indie,alternative',
      votes: 3200,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://netilradio.com',
    },
    {
      id: 'soho',
      stationuuid: 'soho-radio',
      name: 'Soho Radio',
      url: 'https://sohoradiomusic.doughunt.co.uk:8010/320mp3',
      url_resolved: 'https://sohoradiomusic.doughunt.co.uk:8010/320mp3',
      favicon: '',
      country: 'UK',
      countrycode: 'GB',
      language: 'english',
      tags: 'eclectic,indie,electronic',
      votes: 3500,
      codec: 'MP3',
      bitrate: 320,
      homepage: 'https://sohoradiolondon.com',
    },
    {
      id: 'cinemix',
      stationuuid: 'cinemix',
      name: 'Cinemix',
      url: 'https://cinemix.out.airtime.pro/cinemix_a',
      url_resolved: 'https://cinemix.out.airtime.pro/cinemix_a',
      favicon: '',
      country: 'Global',
      countrycode: 'XX',
      language: 'english',
      tags: 'soundtrack,film,cinematic',
      votes: 3000,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://cinemix.com',
    },
  ];

  // Other Notable Stations (24 stations)
  const notableStations: RadioStation[] = [
    {
      id: 'boxout',
      stationuuid: 'boxout-fm',
      name: 'Boxout.fm',
      url: 'https://boxout.fm/stream',
      url_resolved: 'https://boxout.fm/stream',
      favicon: '',
      country: 'India',
      countrycode: 'IN',
      language: 'english',
      tags: 'electronic,underground,indie',
      votes: 3200,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://boxout.fm',
    },
    {
      id: 'indiegini',
      stationuuid: 'indiegini',
      name: 'IndieGini',
      url: 'https://stream.indiegini.com/live',
      url_resolved: 'https://stream.indiegini.com/live',
      favicon: '',
      country: 'Global',
      countrycode: 'XX',
      language: 'english',
      tags: 'indie,rock,alternative',
      votes: 2800,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://indiegini.com',
    },
    {
      id: 'air-rainbow',
      stationuuid: 'air-fm-rainbow',
      name: 'All India Radio — FM Rainbow',
      url: 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio056/playlist.m3u8',
      url_resolved: 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio056/playlist.m3u8',
      favicon: '',
      country: 'India',
      countrycode: 'IN',
      language: 'hindi',
      tags: 'bollywood,hindi,indian',
      votes: 3800,
      codec: 'AAC',
      bitrate: 128,
      homepage: 'https://allindiaradio.gov.in',
    },
    {
      id: 'radiocity',
      stationuuid: 'radiocity-freedom',
      name: 'Radio City Freedom',
      url: 'https://prclive1.listenon.in/Freedom',
      url_resolved: 'https://prclive1.listenon.in/Freedom',
      favicon: '',
      country: 'India',
      countrycode: 'IN',
      language: 'hindi',
      tags: 'bollywood,hindi',
      votes: 3500,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://www.radiocity.in',
    },
    {
      id: 'kuoi',
      stationuuid: 'kuoi-fm',
      name: 'KUOI',
      url: 'https://kuoi.org:8000/stream',
      url_resolved: 'https://kuoi.org:8000/stream',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'college,indie,alternative',
      votes: 2600,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://kuoi.org',
    },
    {
      id: 'kdvs',
      stationuuid: 'kdvs-fm',
      name: 'KDVS',
      url: 'https://archives.kdvs.org:8443/stream',
      url_resolved: 'https://archives.kdvs.org:8443/stream',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'college,freeform,eclectic',
      votes: 2900,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://kdvs.org',
    },
    {
      id: 'kzsc',
      stationuuid: 'kzsc-fm',
      name: 'KZSC',
      url: 'https://kzsc.org:8443/stream',
      url_resolved: 'https://kzsc.org:8443/stream',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'college,indie,alternative',
      votes: 2700,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://kzsc.org',
    },
    {
      id: 'kvsc',
      stationuuid: 'kvsc-fm',
      name: 'KVSC',
      url: 'https://kvsc.org/listen',
      url_resolved: 'https://kvsc.org/listen',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'college,indie,rock',
      votes: 2500,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://kvsc.org',
    },
    {
      id: 'wmnf',
      stationuuid: 'wmnf-fm',
      name: 'WMNF',
      url: 'https://stream.wmnf.org/wmnf_high',
      url_resolved: 'https://stream.wmnf.org/wmnf_high',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'community,eclectic,indie',
      votes: 2800,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://wmnf.org',
    },
    {
      id: 'kfai',
      stationuuid: 'kfai-fm',
      name: 'KFAI',
      url: 'https://stream.kfai.org/live',
      url_resolved: 'https://stream.kfai.org/live',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'community,eclectic,world',
      votes: 2600,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://kfai.org',
    },
    {
      id: 'wncw',
      stationuuid: 'wncw-fm',
      name: 'WNCW',
      url: 'https://wncw.org/listen',
      url_resolved: 'https://wncw.org/listen',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'americana,folk,roots',
      votes: 2700,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://wncw.org',
    },
    {
      id: 'wyep',
      stationuuid: 'wyep-fm',
      name: 'WYEP',
      url: 'https://wyep-ice.streamguys1.com/wyep-mp3',
      url_resolved: 'https://wyep-ice.streamguys1.com/wyep-mp3',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'indie,alternative,rock',
      votes: 2900,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://wyep.org',
    },
    {
      id: 'wfmu',
      stationuuid: 'wfmu-fm',
      name: 'WFMU',
      url: 'https://stream0.wfmu.org/freeform-128k',
      url_resolved: 'https://stream0.wfmu.org/freeform-128k',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'freeform,eclectic,experimental',
      votes: 3100,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://wfmu.org',
    },
    {
      id: 'kcrw',
      stationuuid: 'kcrw-la',
      name: 'KCRW',
      url: 'https://kcrw.streamguys1.com/kcrw_192k_mp3_on_air',
      url_resolved: 'https://kcrw.streamguys1.com/kcrw_192k_mp3_on_air',
      favicon: 'https://www.kcrw.com/favicon.ico',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'npr,news,music',
      votes: 4200,
      codec: 'MP3',
      bitrate: 192,
      homepage: 'https://www.kcrw.com',
    },
    {
      id: 'thelot',
      stationuuid: 'the-lot-radio',
      name: 'The Lot Radio',
      url: 'https://thelotradio.com/listen',
      url_resolved: 'https://thelotradio.com/listen',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'electronic,underground,eclectic',
      votes: 3300,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://thelotradio.com',
    },
    {
      id: 'radiooooo',
      stationuuid: 'radiooooo',
      name: 'Radiooooo',
      url: 'https://radiooooo.com/stream',
      url_resolved: 'https://radiooooo.com/stream',
      favicon: '',
      country: 'Global',
      countrycode: 'XX',
      language: 'multi',
      tags: 'world,vintage,eclectic',
      votes: 3000,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://radiooooo.com',
    },
    {
      id: 'refuge',
      stationuuid: 'refuge-worldwide',
      name: 'Refuge Worldwide',
      url: 'https://refugeworldwide.out.airtime.pro/refugeworldwide_a',
      url_resolved: 'https://refugeworldwide.out.airtime.pro/refugeworldwide_a',
      favicon: '',
      country: 'Germany',
      countrycode: 'DE',
      language: 'english',
      tags: 'electronic,underground,eclectic',
      votes: 3100,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://refugeworldwide.com',
    },
    {
      id: 'oroko',
      stationuuid: 'oroko-radio',
      name: 'Oroko Radio',
      url: 'https://orokoradio.out.airtime.pro/orokoradio_a',
      url_resolved: 'https://orokoradio.out.airtime.pro/orokoradio_a',
      favicon: '',
      country: 'Ghana',
      countrycode: 'GH',
      language: 'english',
      tags: 'african,electronic,world',
      votes: 2900,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://orokoradio.com',
    },
    {
      id: 'kutx',
      stationuuid: 'kutx-fm',
      name: 'KUTX',
      url: 'https://kut.streamguys1.com/kutx-web',
      url_resolved: 'https://kut.streamguys1.com/kutx-web',
      favicon: '',
      country: 'USA',
      countrycode: 'US',
      language: 'english',
      tags: 'indie,alternative,rock',
      votes: 3200,
      codec: 'MP3',
      bitrate: 128,
      homepage: 'https://kutx.org',
    },
  ];

  const handleStationClick = (station: RadioStation) => {
    play(station);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />

      {/* Hero */}
      <section className="relative bg-grid-texture overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 pt-10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/8 mb-5">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-semibold text-primary uppercase tracking-widest">Live Radio Worldwide</span>
            </div>

            <h1 className="font-display text-3xl font-bold text-foreground mb-2 leading-tight">
              Tune Into the
              <br />
              <span className="text-gradient-primary">World</span>
            </h1>

            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Stream live stations from India, USA, Europe, Australia, South America & Africa.
            </p>

            {/* Search */}
            <SearchBar className="w-full" />
          </motion.div>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4">
        {/* Divider */}
        <div className="gold-bar my-6" />

        {/* Region Tabs */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-primary" />
            <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Browse by Region
            </h2>
          </div>
          <RegionTabs selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
        </motion.section>

        {/* Region Header */}
        <motion.div
          key={selectedRegion}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-2xl">{region?.emoji}</span>
          <div>
            <h3 className="font-display text-base font-bold text-foreground">
              {region?.name}
            </h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Broadcasting Live Now
            </p>
          </div>
        </motion.div>

        {/* Stations */}
        <StationGrid regionId={selectedRegion} />

        {/* Divider */}
        <div className="gold-bar my-8" />

        {/* Editor's Picks Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">⭐</span>
            <h2 className="font-display text-lg font-bold text-foreground">
              Editor's Picks
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {editorsPicks.slice(0, showAllEditorsPicks ? editorsPicks.length : 5).map((station) => {
              const isCurrentlyPlaying = currentStation?.id === station.id && isPlaying;
              const StationIcon = stationIcons[station.id] || Radio;
              return (
                <div
                  key={station.id}
                  onClick={() => handleStationClick(station)}
                  className="p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      isCurrentlyPlaying 
                        ? 'bg-primary text-primary-foreground animate-pulse' 
                        : 'bg-secondary group-hover:bg-primary/20'
                    }`}>
                      <StationIcon className={`w-6 h-6 ${isCurrentlyPlaying ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground truncate">{station.name}</h3>
                      <p className="text-xs text-muted-foreground">{station.country} • {station.tags.split(',')[0]}</p>
                    </div>
                    {isCurrentlyPlaying && (
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {editorsPicks.length > 5 && (
            <button
              onClick={() => setShowAllEditorsPicks(!showAllEditorsPicks)}
              className="mt-3 w-full py-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-xs font-medium text-foreground transition-colors"
            >
              {showAllEditorsPicks ? 'Show Less' : `Show ${editorsPicks.length - 5} More`}
            </button>
          )}
        </motion.section>

        {/* Divider */}
        <div className="gold-bar my-8" />

        {/* Other Notable Stations Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🎵</span>
            <h2 className="font-display text-lg font-bold text-foreground">
              Other Notable Stations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notableStations.slice(0, showAllNotable ? notableStations.length : 8).map((station) => {
              const isCurrentlyPlaying = currentStation?.id === station.id && isPlaying;
              const StationIcon = stationIcons[station.id] || Radio;
              return (
                <div
                  key={station.id}
                  onClick={() => handleStationClick(station)}
                  className="p-3 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      isCurrentlyPlaying 
                        ? 'bg-primary text-primary-foreground animate-pulse' 
                        : 'bg-secondary group-hover:bg-primary/20'
                    }`}>
                      <StationIcon className={`w-5 h-5 ${isCurrentlyPlaying ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs text-foreground truncate">{station.name}</h3>
                      <p className="text-[10px] text-muted-foreground truncate">{station.tags.split(',')[0]}</p>
                    </div>
                    {isCurrentlyPlaying && (
                      <div className="flex gap-0.5 flex-shrink-0">
                        <div className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {notableStations.length > 8 && (
            <button
              onClick={() => setShowAllNotable(!showAllNotable)}
              className="mt-3 w-full py-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-xs font-medium text-foreground transition-colors"
            >
              {showAllNotable ? 'Show Less' : `Show ${notableStations.length - 8} More`}
            </button>
          )}
        </motion.section>

        {/* Premium CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 mb-4 relative overflow-hidden rounded-2xl border border-primary/20 bg-card"
        >
          {/* Gold stripe top */}
          <div className="h-0.5 bg-gradient-primary w-full" />
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">Go Premium</h3>
                <p className="text-[11px] text-muted-foreground">HD audio · No ads · Exclusive regions</p>
              </div>
            </div>
            <a
              href="/premium"
              className="block w-full text-center py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 active:scale-98"
            >
              Explore Premium Plans
            </a>
          </div>
        </motion.section>
      </main>

      <AudioPlayer />
    </div>
  );
};

export default Index;
