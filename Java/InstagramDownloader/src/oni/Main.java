package oni;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URL;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by onisuly on 2/10/16.
 * JDK 8
 */
public class Main {
    public static void main(String[] args) {
        String username = args.length >= 1 ? args[0] : "marcella_the_naeun";
        boolean has_next_page;
        String end_cursor = "";
        Proxy proxy = new Proxy( Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 1081) );

        do {
            String HTMLContent = readContent("https://www.instagram.com/" + username + "/?max_id=" + end_cursor, proxy);
            Pattern pattern = Pattern.compile("<script type=\"text/javascript\">window._sharedData = (.+)?;</script>");
            Matcher matcher = pattern.matcher( HTMLContent );
            Optional<String> json = Optional.empty();
            if ( matcher.find() ) {
                json = Optional.of( matcher.group(1) );
            }

            File dir = new File( username );
            if ( !json.isPresent() || ( end_cursor.equals("") && !dir.mkdir() ) ) {
                System.out.println("Error!");
                System.exit(1);
            }

            JSONObject jsonObject = new JSONObject( json.get() );
            JSONObject user = jsonObject.getJSONObject("entry_data").getJSONArray("ProfilePage").getJSONObject(0)
                    .getJSONObject("user");

            JSONArray nodes = user.getJSONObject("media").getJSONArray("nodes");
            JSONObject page_info = user.getJSONObject("media").getJSONObject("page_info");
            has_next_page = page_info.getBoolean("has_next_page");
            end_cursor = page_info.getString("end_cursor");

            for ( int i = 0; i < nodes.length(); ++i ) {
                JSONObject node = nodes.getJSONObject(i);
                String code = node.getString("code");
                LocalDateTime localDateTime = LocalDateTime.ofEpochSecond(node.getInt("date"), 0, ZoneOffset.UTC);
                String date = localDateTime.format( DateTimeFormatter.ofPattern("yyyyMMddhhmmss") );
                boolean is_video = node.getBoolean("is_video");

                if ( is_video ) {
                    new Thread( () -> {
                        String videoContent = readContent("https://www.instagram.com/p/" + code, proxy);
                        Matcher videoMatcher = pattern.matcher( videoContent );
                        if ( videoMatcher.find() ) {
                            String videoJson = videoMatcher.group(1);
                            JSONObject videoObject = new JSONObject(videoJson);
                            String video_url = videoObject.getJSONObject("entry_data").getJSONArray("PostPage")
                                    .getJSONObject(0).getJSONObject("media").getString("video_url");
                            new Thread( () -> downloadFile(video_url, dir, date, proxy) ).run();
                        }
                    }).run();
                }
                else {
                    String display_src = node.getString("display_src");
                    new Thread( () -> downloadFile(display_src, dir, date, proxy) ).run();
                }
            }
        } while ( has_next_page );
    }

    private static void downloadFile( String address, File dir, String caption, Proxy proxy ) {
        try {
            URLConnection connection;
            if ( proxy != null ) {
                connection = new URL(address).openConnection(proxy);
            }
            else {
                connection = new URL(address).openConnection(Proxy.NO_PROXY);
            }

            connection.connect();
            InputStream is = connection.getInputStream();

            final int BUFFER_SIZE = 1024;
            byte[] BUFFER = new byte[BUFFER_SIZE];
            int bytesRead;
            String fileName = address.split("\\?ig_cache_key")[0];
            fileName = caption + fileName.substring( fileName.lastIndexOf(".") );
            File outFile = new File(dir.getAbsolutePath() + File.separator + fileName);
            OutputStream os = new FileOutputStream(outFile);
            while ( ( bytesRead = is.read(BUFFER, 0, BUFFER_SIZE) ) != -1 ) {
                os.write(BUFFER, 0, bytesRead);
            }
            os.flush();
            os.close();
            is.close();
        }
        catch ( IOException e ) {
            e.printStackTrace();
        }
    }

    private static String readContent( String address, Proxy proxy ) {
        String HTMLContent = "";
        try {
            URLConnection connection;
            if ( proxy != null ) {
                connection = new URL(address).openConnection(proxy);
            }
            else {
                connection = new URL(address).openConnection(Proxy.NO_PROXY);
            }

            connection.connect();
            InputStream is = connection.getInputStream();
            BufferedReader br = new BufferedReader( new InputStreamReader(is) );
            final int BUFFER_SIZE = 1024;
            char[] buffer = new char[BUFFER_SIZE];
            int charsRead;
            StringBuilder sb = new StringBuilder();
            while ( ( charsRead = br.read(buffer, 0, BUFFER_SIZE) ) != -1 ) {
                sb.append(buffer, 0, charsRead);
            }
            is.close();
            HTMLContent = sb.toString();
        }
        catch ( IOException e ) {
            e.printStackTrace();
        }

        return HTMLContent;
    }
}
