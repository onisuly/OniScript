package oni;

import java.net.InetSocketAddress;
import java.net.Proxy;

/**
 * Created by onisuly on 2/12/16.
 * Instagram Downloader
 */
public class Main {

    private static InstagramDownloader instagramDownloader = new InstagramDownloader();

    public static void main(String[] args) {
        switch ( args.length ) {
            case 1:
                if ( args[0].charAt(0) == '-' ) {
                    printUsage();
                }
                else {
                    instagramDownloader.parse(args[0], Proxy.NO_PROXY);
                }
                break;
            case 3:
                if ( "--http_proxy".equalsIgnoreCase(args[1]) ) {
                    try {
                        String hostname = args[2].split(":")[0];
                        int port = Integer.parseInt(args[2].split(":")[1]);
                        Proxy proxy = new Proxy( Proxy.Type.HTTP, new InetSocketAddress(hostname, port) );
                        instagramDownloader.parse( args[0], proxy );
                    }
                    catch ( Exception e ) {
                        printUsage();
                    }
                }
                else {
                    printUsage();
                }
                break;
            default:
                printUsage();
        }
    }

    private static void printUsage() {
        System.out.println(
                "Usage: java -jar InstagramDownloader.jar username [--http_proxy hostname:port]" +
                "Example: java -jar InstagramDownloader.jar marcella_the_naeun --http_proxy 127.0.0.1:1081");
    }
}
