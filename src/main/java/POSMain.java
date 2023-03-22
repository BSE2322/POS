public class POSMain{
    public static void main(String[] args){
        System.out.println("POS System Starting ....");
        ProductCatalog catalog = ProductCatalog.getInstance();
        catalog.testMeth();
    }
}