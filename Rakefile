
desc "Release a new SeatHolder version"
task :release, :version do |task, args|
  if (args[:version] || "").strip.empty?
    puts "usage: rake seat_holder:release[version]"
    exit
  end
  
  timestamp = Time.now
  javascript = File.open("src/seat_holder.js").readlines.collect{ |line|
    line.gsub(/\{(version|year|date)\}/) do |matched|
      case matched
      when "{version}"
        args[:version]
      when "{year}"
        timestamp.year.to_s
      when "{date}"
        timestamp.strftime("%Y-%m-%d %H:%M:%S +0100 (%a, %d %B %Y)")
      end
    end
  }
  
  # Define variables
  releases_dir = "releases"
  release_dir  = "#{releases_dir}/#{args[:version]}"
  
  # Create directories
  FileUtils.rm_r(release_dir) if File.exists?(release_dir)
  FileUtils.mkdir_p("#{release_dir}/jquery")
  
  # Create files
  File.open("#{release_dir}/seat_holder.js", "w").puts(javascript)
  FileUtils.cp("src/jquery/core.js", "#{release_dir}/jquery")
  File.open("VERSION", "w").puts(args[:version])

  # Compress release using YUI compressor
  IO.popen "java -jar lib/yuicompressor-2.4.2.jar -v #{release_dir}/seat_holder.js -o #{release_dir}/seat_holder-min.js"
end
